import AdminLayout from "@/components/AdminLayout";
import { Settings, Shield, Bell, Lock, Database } from "lucide-react";

export default function AdminSettings() {
  const sections = [
    { title: "General Settings", desc: "Configure platform name and basic metadata.", icon: Settings },
    { title: "Authentication", desc: "Manage session timeouts and security protocols.", icon: Lock },
    { title: "Notifications", desc: "Configure email alerts and system notifications.", icon: Bell },
    { title: "Database Management", desc: "Monitor Supabase connection and backups.", icon: Database },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Platform Settings</h1>
          <p className="text-zinc-500">Configure and manage your service marketplace environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.title} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <section.icon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{section.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{section.desc}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
                <button className="text-xs font-bold text-blue-500 uppercase tracking-widest hover:underline">
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
