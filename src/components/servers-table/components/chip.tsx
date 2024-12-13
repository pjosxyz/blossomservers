import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Chip({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex self-start items-center px-2 py-0.5 rounded text-xs font-medium", className)}>
      {children}
    </span>
  );
}
