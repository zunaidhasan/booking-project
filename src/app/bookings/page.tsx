"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Home, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function BookingsContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Simple fetch for session if needed, or just rely on Navbar's own logic?
        // Actually, since this is a client component, we might want to know who is logged in.
        // For simplicity, we'll just show the success UI.
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-8 mx-auto shadow-2xl shadow-emerald-500/10">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Payment <span className="text-emerald-500 font-serif italic">Successful!</span>
        </h1>
        
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Your booking has been confirmed. A professional confirmation email with your 
          service details and next steps has been sent to your inbox.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">
          <Link
            href="/"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all group"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Back to Home
          </Link>
          <Link
            href="/admin"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 group"
          >
            View Bookings
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="mt-16 pt-12 border-t border-white/5">
          <p className="text-zinc-500 text-sm">
            Need help with your booking? <Link href="/#contact" className="text-blue-500 hover:text-blue-400">Contact our support 24/7</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

export default function BookingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <Navbar session={null} /> {/* Session will be handled by a client-side fetch in Navbar if updated, or passed from layout */}
      
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        </div>
      }>
        <BookingsContent />
      </Suspense>

      <Footer />
    </div>
  );
}
