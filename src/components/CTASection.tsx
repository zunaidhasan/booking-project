"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-600/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 lg:p-20 rounded-[40px] border border-white/10 text-center shadow-2xl overflow-hidden relative"
        >
          {/* Decorative Rings */}
          <div className="absolute -top-24 -left-24 w-64 h-64 border border-white/5 rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 border border-white/5 rounded-full" />

          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
            Ready to Elevate Your <br />
            <span className="text-blue-500 font-serif italic">Business?</span>
          </h2>
          <p className="text-zinc-400 text-lg lg:text-xl max-w-2xl mx-auto mb-12">
            Join thousands of professionals already booking high-quality services 
            through our platform. Expert results, guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/#services"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#contact"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold transition-all border border-white/10 flex items-center justify-center"
            >
              Talk to Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
