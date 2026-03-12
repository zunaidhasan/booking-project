"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, CreditCard, Mail } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Select Service",
      description: "Browse our marketplace and choose the expert service you need.",
      color: "bg-blue-500",
      delay: 0
    },
    {
      icon: CalendarCheck,
      title: "Confirm Booking",
      description: "Select your preferred date and time for the service.",
      color: "bg-purple-500",
      delay: 0.1
    },
    {
      icon: CreditCard,
      title: "Pay Securely",
      description: "Complete your booking with our secure Stripe payment gateway.",
      color: "bg-pink-500",
      delay: 0.2
    },
    {
      icon: Mail,
      title: "Receive Confirmation",
      description: "Get an instant email with all your booking details.",
      color: "bg-emerald-500",
      delay: 0.3
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            How it <span className="text-blue-500">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            We&apos;ve simplified the booking process into four easy steps. 
            Get the professional help you need without the headache.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 hidden lg:block -translate-y-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step.delay }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500",
                  step.color
                )}>
                  <step.icon className="w-10 h-10 text-white" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-xl">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Utility to merge classes within the file since it's a new component
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
