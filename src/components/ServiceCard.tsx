"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, Check } from "lucide-react";
import ServiceImage from "@/components/ServiceImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/services/${service.id}`} className="block">
        <div className="glass-card rounded-[24px] border border-white/5 overflow-hidden transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 group-hover:-translate-y-2">
          {/* Image Container */}
          <div className="relative h-64 w-full overflow-hidden">
            <ServiceImage
              src={service.image}
              alt={service.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            
            {/* Price Badge */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1 text-white font-bold text-sm">
              ${service.price}
            </div>

            {/* Rating Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="font-bold">4.9</span>
              <span className="text-zinc-400">(120+)</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Premium Service</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-500 transition-colors tracking-tight">
              {service.name}
            </h3>
            
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2 italic">
              &ldquo;{service.description}&rdquo;
            </p>

            <div className="space-y-3 mb-8">
              {["Expert Delivery", "Verified Quality"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <Check className="w-3 h-3 text-blue-500" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <Clock className="w-4 h-4" />
                <span>2-3 Days</span>
              </div>
              <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                View Details
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
