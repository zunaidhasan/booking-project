"use client";

import { useState } from "react";
import { PlusCircle, X, Loader2, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddServiceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    try {
      new URL(formData.image);
    } catch (error) {
      alert("Please enter a valid image URL (e.g., https://...)");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/admin/services", formData);
      setIsOpen(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to add service:", error);
      alert("Failed to add service. Please check all fields.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
      >
        <PlusCircle className="w-4 h-4" />
        Add New Service
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
              <h2 className="text-xl font-bold text-white">Create New Service</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Service Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Premium Web Development"
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your service in detail..."
                  className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Price ($)</label>
                  <input
                    required
                    type="number"
                    placeholder="499"
                    className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Image URL</label>
                  <input
                    required
                    type="text"
                    placeholder="https://..."
                    className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Service"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
