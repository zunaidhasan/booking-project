"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Shield, Loader2 } from "lucide-react";
import axios from "axios";

interface BookingSidebarProps {
  service: {
    id: string;
    name: string;
    price: number;
  };
}

export default function BookingSidebar({ service }: BookingSidebarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post("/api/checkout", {
        serviceId: service.id,
      });
      window.location.href = response.data.url;
    } catch (err: any) {
      console.error("Booking error:", err);
      setError("Failed to create checkout session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl bg-zinc-900/40 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="relative">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-zinc-500 text-sm font-medium mb-1 uppercase tracking-wider">Starting at</p>
            <h3 className="text-4xl font-black text-white">${service.price}</h3>
          </div>
          <div className="text-zinc-400 text-xs text-right">
            <p className="font-bold text-blue-500">24h Delivery</p>
            <p>Ready to start</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
            <div className="flex items-center justify-between text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Delivery Time
              </div>
              <span className="font-bold text-white">2 Days</span>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Revisions
              </div>
              <span className="font-bold text-white">Unlimited</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group mb-4"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Book Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        {error && (
          <p className="text-red-500 text-xs text-center mb-4">{error}</p>
        )}

        <div className="flex items-center justify-center gap-2 text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
          <Shield className="w-3 h-3 text-emerald-500" />
          Secure payment guaranteed
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
          {[
            "Industry standard results",
            "Professional communication",
            "Full source file delivery"
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
