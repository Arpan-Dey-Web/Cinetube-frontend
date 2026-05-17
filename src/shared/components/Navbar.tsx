"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Film,
  Menu,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/providers/auth-provider";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PUBLIC_NAV_LINKS } from "@/constants/site-content";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { LogoutButton } from "@/components/ui/LogoutButton";

const Navbar = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all duration-500">
      {/* Top accent bar */}
      <div className="h-[1px] w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        {/* LEFT: BRANDING + NAV */}
        <div className="flex items-center gap-8 lg:gap-12">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <Film className="h-6 w-6 text-primary transition-transform duration-1000 group-hover:rotate-[360deg]" />
              <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-black tracking-[0.3em] uppercase text-foreground">
              FLICKS
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 border-l border-border/50 pl-10">
            {/* Browse Link */}
            <Link
              href="/browse"
              className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 relative group/link ${isActive("/browse")
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
                }`}
            >
              Browse
              <span
                className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${isActive("/browse") ? "w-full" : "w-0 group-hover/link:w-full"
                  }`}
              />
            </Link>

            {/* Other nav links */}
            {PUBLIC_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 relative group/link ${isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${isActive(link.href) ? "w-full" : "w-0 group-hover/link:w-full"
                    }`}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT: SEARCH + USER + MOBILE */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Desktop search */}

          <ModeToggle />

          {/* Desktop user area */}
          <div className="hidden lg:flex items-center">
            {user ? (
              <div className="group relative flex items-center gap-4 pl-6 border-l border-border/50 cursor-pointer py-2">
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none text-foreground">
                    {user.name}
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-tighter text-primary">
                    {user.role === "ADMIN" ? "Admin" : "Member"}
                  </p>
                </div>
                <div className="h-9 w-9 border border-primary/20 flex items-center justify-center bg-muted/10 group-hover:border-primary transition-colors duration-500">
                  <UserIcon className="h-4 w-4 text-primary" />
                </div>
                {/* Dropdown */}
                <div className="absolute top-[100%] right-0 w-52 bg-background/95 backdrop-blur-md border border-border mt-1 p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 shadow-2xl z-50">
                  <Link
                    href="/dashboard"
                    className="block p-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-colors"
                  >
                    Dashboard
                  </Link>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/dashboard/admin/movies"
                      className="block p-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-colors text-primary"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    href="/dashboard/profile"
                    className="block p-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-colors"
                  >
                    Profile
                  </Link>
                  <div className="h-px bg-border/50 my-1 mx-2" />
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6 pl-6 border-l border-border/50">
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

          {/* Mobile menu button */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="h-10 w-10 border border-border flex items-center justify-center hover:border-primary transition-colors">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background border-border p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <Film className="h-5 w-5 text-primary" />
                    <span className="text-lg font-black tracking-[0.3em] uppercase">
                      FLICKS
                    </span>
                  </Link>
                </div>

                {/* Nav Links */}
                <div className="flex-1 p-6 space-y-1">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="block p-3 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    Home
                  </Link>
                  <Link
                    href="/browse"
                    onClick={() => setMobileOpen(false)}
                    className="block p-3 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    Browse
                  </Link>
                  {PUBLIC_NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block p-3 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Footer: Auth */}
                <div className="p-6 border-t border-border space-y-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 border border-primary/30 flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">
                            {user.name}
                          </p>
                          <p className="text-[8px] text-primary uppercase tracking-wider">
                            {user.role}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="block w-full py-3 text-center text-[10px] font-black uppercase tracking-widest border border-border hover:border-primary hover:text-primary transition-colors"
                      >
                        Dashboard
                      </Link>
                      <LogoutButton />
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="block w-full py-3 text-center text-[10px] font-black uppercase tracking-widest border border-border hover:border-primary hover:text-primary transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileOpen(false)}
                        className="block w-full py-3 text-center text-[10px] font-black uppercase tracking-widest bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        Join Now
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
