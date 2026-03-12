"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a0a0a]">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Over 500+ professionals available
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Book Professional <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Services in Minutes
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-xl">
              From coding to design, find the experts you need and book 
              instantly. Secure payments, guaranteed quality, and 
              real-time availability.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link
                href="/#services"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group"
              >
                Book a Service
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#how-it-works"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                View How it Works
              </Link>
            </div>

            <div className="flex items-center gap-6">
              {[
                "Certified Experts",
                "Instant Schedule",
                "Secure Payment"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-zinc-500">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10 group">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
                alt="Professional service"
                width={1000}
                height={1200}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 z-20 glass-card p-6 rounded-2xl border border-white/10 shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#121212] bg-zinc-800 overflow-hidden">
                      <Image 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} 
                        alt="User avatar" 
                        width={32} 
                        height={32} 
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-white">+2.4k users</div>
              </div>
              <div className="text-zinc-400 text-sm">Join the leading marketplace <br />for high-end services.</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
