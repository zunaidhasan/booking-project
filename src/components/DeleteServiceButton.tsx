"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DeleteServiceButtonProps {
  id: string;
}

export default function DeleteServiceButton({ id }: DeleteServiceButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service? This will also affect existing bookings.")) return;

    try {
      setIsDeleting(true);
      await axios.delete("/api/admin/services", {
        data: { id },
      });
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete service.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={cn(
        "p-2 bg-red-500/10 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500/20 transition-all",
        isDeleting && "opacity-50 cursor-not-allowed"
      )}
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
