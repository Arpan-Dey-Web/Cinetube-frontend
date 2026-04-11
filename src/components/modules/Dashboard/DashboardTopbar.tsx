"use client";

import Link from "next/link";
import { ChevronDown, User } from "lucide-react";
import { useAuth } from "@/provider/auth-provider";
import { ModeToggle } from "@/components/ui/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/ui/LogoutButton";

export function DashboardTopbar() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <ModeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 border border-border bg-card/40 px-3 py-2 text-left">
            <div className="flex h-9 w-9 items-center justify-center border border-primary/20 bg-primary/5">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-[10px] font-black uppercase tracking-[0.25em] text-foreground">
                {user?.name ?? "Member"}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
                {user?.role ?? "USER"}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.25em]">
            Dashboard Menu
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Overview</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/browse">Browse Library</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
