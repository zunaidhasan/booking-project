import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAuthSession } from "@/lib/auth";
import ServiceImage from "@/components/ServiceImage";
import { notFound } from "next/navigation";
import BookingSidebar from "@/components/BookingSidebar";
import { Star, ShieldCheck, Zap, Globe, MessageSquare } from "lucide-react";

async function getService(id: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });
    return service;
  } catch (error) {
    return null;
  }
}

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const service = await getService(id);
  const session = await getAuthSession();

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Navbar session={session} />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column: Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-500 text-xs font-bold uppercase tracking-wider">
                    <Zap className="w-3 h-3" />
                    Bestseller
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold text-white">4.9</span>
                    <span>(1,240 reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                  {service.name}
                </h1>
                <div className="flex items-center gap-6 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>English, Spanish</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Quick Response</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <ServiceImage
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* About */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">About this Service</h2>
                <p className="text-zinc-400 text-lg leading-relaxed italic">
                  &ldquo;{service.description}&rdquo;
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Full Professional Support",
                    "Unlimited Revisions",
                    "Commercial Rights Included",
                    "Source Files Provided",
                    "VIP Delivery",
                    "24/7 Consultation"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-zinc-300">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section Placeholder */}
              <div className="pt-12 border-t border-white/5">
                <h3 className="text-2xl font-bold text-white mb-8">What Clients Say</h3>
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-800" />
                      <div>
                        <div className="text-white font-bold text-sm">John Doe</div>
                        <div className="flex text-yellow-500 text-xs pt-1">★★★★★</div>
                      </div>
                    </div>
                    <p className="text-zinc-400">Outstanding quality and very professional communication. Exceeded all expectations!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <BookingSidebar service={service} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
