"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Booking<span className="text-blue-500">Pro</span>
              </span>
            </Link>
            <p className="text-zinc-500 leading-relaxed max-w-xs">
              The premier marketplace for professional services. 
              Connecting ambitious businesses with top-tier expert help 
              since 2024.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/10 transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/10 transition-all">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/10 transition-all">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4">
              {["Web Development", "UI/UX Design", "Content Strategy", "Digital Marketing", "Cloud Architecture"].map((item) => (
                <li key={item}>
                  <Link href="/#services" className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4">
              {["Help Center", "Community Guidelines", "Terms of Service", "Privacy Policy", "Trust & Safety"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                123 Innovation Drive, <br />Silicon Valley, CA 94025
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-500">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                hello@bookingpro.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-600 text-sm">
            © {currentYear} BookingPro Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-zinc-600">
            <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-zinc-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
