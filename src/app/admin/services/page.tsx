import AdminLayout from "@/components/AdminLayout";
import { PlusCircle, Search, Filter, MoreVertical, Edit2, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ServiceImage from "@/components/ServiceImage";
import DeleteServiceButton from "@/components/DeleteServiceButton";
import AddServiceModal from "@/components/AddServiceModal";

async function getServices() {
  return await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminServices() {
  const services = await getServices();

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Service Catalog</h1>
            <p className="text-zinc-500 text-sm">Manage your marketplace offerings and pricing.</p>
          </div>
          <AddServiceModal />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any) => (
            <div key={service.id} className="glass-card rounded-2xl border border-white/5 overflow-hidden group hover:border-white/10 transition-all flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <ServiceImage 
                  src={service.image} 
                  alt={service.name} 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="text-lg font-black text-white">${service.price}</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <DeleteServiceButton id={service.id} />
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold mb-2 group-hover:text-blue-500 transition-colors uppercase tracking-tight">{service.name}</h3>
                  <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed italic">
                    &ldquo;{service.description}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[9px] text-zinc-500 uppercase font-black tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live on Marketplace
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
