import AdminLayout from "@/components/AdminLayout";
import { Users, Search, Mail, Shield, ShieldCheck, MoreVertical } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminUsers() {
  const users = await getUsers();

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-zinc-500">Oversee platform users and administrative roles.</p>
        </div>

        <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0c0c0c] text-zinc-500 text-[10px] font-extrabold uppercase tracking-widest">
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Joined</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-xs text-zinc-400 font-bold uppercase">
                          {user.username[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{user.username}</p>
                          <p className="text-xs text-zinc-500">user_{user.id.slice(0, 6)}@system.internal</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        user.role === "admin" ? "bg-purple-500/10 text-purple-500 border border-purple-500/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                      )}>
                        {user.role === "admin" ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-zinc-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
