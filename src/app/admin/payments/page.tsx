import AdminLayout from "@/components/AdminLayout";
import { CreditCard, TrendingUp, ArrowUpRight, ArrowDownLeft, DollarSign, Activity } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

async function getPaymentStats() {
  const [totalRevenue, paidCount, pendingCount] = await Promise.all([
    prisma.booking.aggregate({
      where: { paymentStatus: "paid" },
      _sum: { totalPrice: true },
    }),
    prisma.booking.count({
      where: { paymentStatus: "paid" },
    }),
    prisma.booking.count({
      where: { paymentStatus: "unpaid" },
    }),
  ]);

  return {
    revenue: totalRevenue._sum.totalPrice || 0,
    paidCount,
    pendingCount
  };
}

export default async function AdminPayments() {
  const stats = await getPaymentStats();

  const paymentMethods = [
    { name: "Stripe Checkout", type: "Credit Card", status: "Active", icon: CreditCard },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Financial Overview</h1>
          <p className="text-zinc-500">Monitor transactions, revenue, and active payment gateways.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-600/5 to-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-600/10 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+12.4%</span>
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</p>
            <p className="text-3xl font-black text-white">${stats.revenue}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Activity className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="text-xs font-bold text-zinc-500">Real-time</span>
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Confirmed Payments</p>
            <p className="text-3xl font-black text-white">{stats.paidCount}</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-500/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">Pending</span>
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Pending Volume</p>
            <p className="text-3xl font-black text-white">{stats.pendingCount}</p>
          </div>
        </div>

        <div className="space-y-6 pt-8">
          <h2 className="text-xl font-bold text-white">Configured Gateways</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.name} className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{method.name}</h3>
                    <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">{method.type}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {method.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
