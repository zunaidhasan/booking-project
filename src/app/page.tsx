import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

// Seed local services if DB is empty
const defaultServices = [
  {
    name: "Web Development",
    description: "Custom, high-performance web applications built with modern technologies.",
    price: 499,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "UI/UX Design",
    description: "Premium user interfaces and experience designs that wow your customers.",
    price: 299,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "SEO Optimization",
    description: "Boost your search engine rankings and drive organic traffic to your site.",
    price: 199,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mobile App Development",
    description: "Cross-platform mobile apps for iOS and Android with native performance.",
    price: 699,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  },
];

async function getServices() {
  try {
    let services = await prisma.service.findMany();
    
    // If no services, try to seed them
    if (services.length === 0) {
      try {
        await prisma.service.createMany({
          data: defaultServices,
        });
        services = await prisma.service.findMany();
      } catch (e) {
        console.log("Seeding failed (check DATABASE_URL):", e);
        return defaultServices.map((s, i) => ({ ...s, id: i.toString() }));
      }
    }
    return services;
  } catch (error) {
    console.error("Database connection failed. Using fallback data.", error);
    return defaultServices.map((s, i) => ({ ...s, id: i.toString() }));
  }
}

export default async function Home() {
  const services = await getServices();
  const session = await getAuthSession();

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Navbar session={session} />
      
      <main>
        <Hero />
        
        {/* Services Section */}
        <section id="services" className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Featured <span className="text-blue-500 font-serif italic">Services</span>
              </h2>
              <p className="text-zinc-400 text-lg">
                Hand-picked professional services designed to help you scale 
                faster and maintain the highest quality standards.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-blue-500 font-bold hover:gap-3 transition-all cursor-pointer">
              Browse All Services <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        <HowItWorks />
        <TrustSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

// Re-using the ArrowRight icon locally for the Browse All button
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
