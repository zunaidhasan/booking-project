"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Heart, Headphones } from "lucide-react";

export default function TrustSection() {
  const stats = [
    { icon: Users, label: "Total Bookings", value: "500+", color: "text-blue-500" },
    { icon: Briefcase, label: "Active Services", value: "120+", color: "text-purple-500" },
    { icon: Heart, label: "Satisfaction", value: "98%", color: "text-pink-500" },
    { icon: Headphones, label: "24/7 Support", value: "Live", color: "text-emerald-500" }
  ];

  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Startup Founder",
      text: "BookingPro has transformed how we hire specialized help. The platform is seamless and the quality is top-tier.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
      name: "Sarah Chen",
      role: "Creative Director",
      text: "The instant scheduling feature is a game-changer. I can book a service and get started in minutes.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 text-center group hover:border-white/10 transition-all shadow-xl shadow-black"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-extrabold text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-zinc-500 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Trusted by <span className="text-blue-500">Professionals</span>
          </motion.h2>
          <p className="text-zinc-400">Join thousands of satisfied users who book services through our platform.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl border border-white/5 relative group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-zinc-800 border-2 border-white/10">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white leading-none mb-1">{t.name}</h4>
                  <p className="text-zinc-500 text-sm">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
              </div>
              <p className="text-zinc-300 italic leading-relaxed font-medium">
                &ldquo;{t.text}&rdquo;
              </p>
              
              {/* Quote Icon Decorations */}
              <div className="absolute top-10 right-10 text-6xl text-white/5 font-serif select-none pointer-events-none italic">
                &rdquo;
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
