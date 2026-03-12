"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DeleteBookingButtonProps {
  bookingId: string;
}

export default function DeleteBookingButton({ bookingId }: DeleteBookingButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      setIsDeleting(true);
      await axios.delete("/api/bookings", {
        data: { id: bookingId },
      });
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete booking.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={cn(
        "p-2 rounded-lg border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 text-zinc-500 hover:text-red-500 transition-all",
        isDeleting && "opacity-50 cursor-not-allowed"
      )}
      title="Delete Booking"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
