"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, HelpCircle, Phone, LogIn, User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

interface NavbarProps {
  session: any;
}

export default function Navbar({ session }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: "Services", href: "/#services", icon: LayoutGrid },
    { name: "How it Works", href: "/#how-it-works", icon: HelpCircle },
    { name: "Contact", href: "/#contact", icon: Phone },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 py-3" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-blue-600/20">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
            Booking<span className="text-blue-500">Pro</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all"
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white">
                  {session.username[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium text-zinc-200">{session.username}</span>
                <ChevronDown className={cn("w-4 h-4 text-zinc-400 transition-transform", isUserMenuOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Role</p>
                      <p className="text-sm text-blue-500 font-medium capitalize">{session.role}</p>
                    </div>
                    {session.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-200 hover:bg-white/5 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LayoutGrid className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-400/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/#services"
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-blue-600/20"
              >
                Book Now
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/10 px-6 py-8 overflow-hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              {!session && (
                <Link
                  href="/login"
                  className="text-lg font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
