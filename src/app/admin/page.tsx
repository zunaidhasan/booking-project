import AdminLayout from "@/components/AdminLayout";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Trash2,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteBookingButton from "@/components/DeleteBookingButton";
import AdminDashboardClient from "@/components/AdminDashboardClient";

async function getAdminData() {
  const [bookings, totalRevenue, pendingCount] = await Promise.all([
    prisma.booking.findMany({
      include: { service: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.aggregate({
      where: { paymentStatus: "paid" },
      _sum: { totalPrice: true },
    }),
    prisma.booking.count({
      where: { status: "pending" },
    }),
  ]);

  return {
    bookings,
    stats: [
      { 
        label: "Total Revenue", 
        value: `$${totalRevenue._sum.totalPrice || 0}`, 
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
      },
      { 
        label: "Total Bookings", 
        value: bookings.length, 
        color: "text-blue-500",
        bg: "bg-blue-500/10"
      },
      { 
        label: "Pending Action", 
        value: pendingCount, 
        color: "text-orange-500",
        bg: "bg-orange-500/10"
      },
      { 
        label: "Growth", 
        value: "+12.5%", 
        color: "text-purple-500",
        bg: "bg-purple-500/10"
      },
    ]
  };
}

export default async function AdminDashboard() {
  const session = await getAuthSession();

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  const { bookings, stats } = await getAdminData();

  return (
    <AdminLayout>
      <AdminDashboardClient initialBookings={bookings} stats={stats} />
    </AdminLayout>
  );
}
