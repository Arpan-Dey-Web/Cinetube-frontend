"use client";
import React from "react";
import Link from "next/link";
import { Search, Film, Menu, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/ModeToggle";
import { useAuth } from "@/provider/auth-provider";
import { LogoutButton } from "../ui/LogoutButton";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all duration-500">
      {/* Editorial Top Bar Accent */}
      <div className="h-[1px] w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        {/* LEFT: BRANDING */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Film className="h-6 w-6 text-primary transition-transform duration-1000 group-hover:rotate-[360deg]" />
              <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-black tracking-[0.3em] uppercase text-foreground">
              FLICKS
            </span>
          </Link>

          {/* EDITORIAL LINKS */}
          <div className="hidden lg:flex items-center gap-10 border-l border-border/50 pl-12">
            {["Browse", "Watchlist", "Archive"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-all duration-300 relative group/link"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover/link:w-full" />
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT: SEARCH & USER */}
        <div className="flex items-center gap-8">
          {/* MINIMALIST SEARCH */}
          <div className="hidden md:flex relative items-center group">
            <Search className="absolute left-0 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              placeholder="SEARCH CATALOG..."
              className="bg-transparent border-b border-transparent focus:border-primary/40 py-1 pl-7 text-[9px] font-black tracking-[0.2em] uppercase outline-none w-32 focus:w-56 transition-all duration-500 placeholder:text-muted-foreground/40"
            />
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {user ? (
              <div className="group relative flex items-center gap-4 pl-6 border-l border-border/50 cursor-pointer py-2">
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none text-foreground">
                    {user.name}
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-tighter text-primary">
                    Member
                  </p>
                </div>

                <div className="h-9 w-9 border border-primary/20 flex items-center justify-center bg-muted/10 group-hover:border-primary transition-colors duration-500">
                  <UserIcon className="h-4 w-4 text-primary" />
                </div>

                {/* DROPDOWN MENU */}
                <div className="absolute top-[100%] right-0 w-48 bg-background/95 backdrop-blur-md border border-border mt-1 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 shadow-2xl z-50">
                  <Link
                    href="/profile"
                    className="block p-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="block p-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-colors"
                  >
                    Settings
                  </Link>
                  <div className="h-px bg-border/50 my-1 mx-2" />
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  href="/login"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Button
                  asChild
                  className="rounded-none bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em] px-8 h-10 hover:bg-primary/90 hover:skew-x-[-12deg] transition-all duration-300"
                >
                  <Link href="/register">Join</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
