"use client";

import { useState, useMemo } from "react";
import { 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Clock,
  ExternalLink,
  Search,
  Filter,
  Download,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteBookingButton from "@/components/DeleteBookingButton";

interface AdminDashboardClientProps {
  initialBookings: any[];
  stats: any[];
}

export default function AdminDashboardClient({ initialBookings, stats }: AdminDashboardClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isExporting, setIsExporting] = useState(false);

  const filteredBookings = useMemo(() => {
    return initialBookings.filter(booking => {
      const matchesSearch = 
        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [initialBookings, searchTerm, statusFilter]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      window.location.href = "/api/admin/export";
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export bookings.");
    } finally {
      setIsExporting(false);
    }
  };

  const iconMap: Record<string, any> = {
    "Total Revenue": DollarSign,
    "Total Bookings": ShoppingBag,
    "Pending Action": Clock,
    "Growth": TrendingUp,
  };

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Platform Overview</h1>
          <p className="text-zinc-500 text-sm">Monitor and manage your service marketplace performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? "Exporting..." : "Export Report"}
          </button>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
            Platform Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = iconMap[stat.label] || ShoppingBag;
          return (
            <div key={stat.label} className="glass-card p-6 rounded-2xl border border-white/5 shadow-xl group hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                  <Icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-1 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls & Table */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by customer or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex p-1 bg-zinc-900/50 border border-white/5 rounded-xl">
              {["all", "pending", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                    statusFilter === status 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "text-zinc-500 hover:text-white"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
          <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              Marketplace Transactions
              <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full border border-blue-500/20 uppercase">
                {filteredBookings.length} Total
              </span>
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0c0c0c] text-zinc-500 text-[10px] font-extrabold uppercase tracking-widest">
                  <th className="px-8 py-5">Customer</th>
                  <th className="px-8 py-5">Service</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Payment</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5">
                          <ShoppingBag className="w-8 h-8 text-zinc-700" />
                        </div>
                        <p className="text-zinc-500 font-medium">No transactions found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="group hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] text-zinc-400 font-black uppercase">
                            {booking.customerEmail[0]}
                          </div>
                          <div>
                            <span className="text-sm text-white font-bold block">{booking.customerEmail}</span>
                            <span className="text-[10px] text-zinc-600 font-mono">{booking.id.slice(0, 8)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 group/link cursor-pointer">
                          <span className="text-sm text-zinc-300 group-hover/link:text-blue-500 transition-colors">{booking.service.name}</span>
                          <ExternalLink className="w-3 h-3 text-zinc-600 group-hover/link:text-blue-500 transition-colors" />
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          booking.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                          booking.status === "pending" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" :
                          "bg-red-500/10 text-red-500 border border-red-500/20"
                        )}>
                          <div className={cn("w-1 h-1 rounded-full", 
                            booking.status === "completed" ? "bg-emerald-500" :
                            booking.status === "pending" ? "bg-orange-500" : "bg-red-500"
                          )} />
                          {booking.status}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest p-1 border rounded",
                          booking.paymentStatus === "paid" ? "text-emerald-500 border-emerald-500/20" : "text-zinc-600 border-white/5"
                        )}>
                          {booking.paymentStatus === "paid" ? "Confirmed" : "Pending"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-white">${booking.totalPrice}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <DeleteBookingButton bookingId={booking.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
