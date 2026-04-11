"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Film,
  Menu,
  User as UserIcon,
  Zap,
  Globe,
  BookOpen,
  Star,
  Tv,
  Clapperboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/ModeToggle";
import { useAuth } from "@/provider/auth-provider";
import { LogoutButton } from "../ui/LogoutButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PUBLIC_NAV_LINKS } from "@/lib/site-content";

const BROWSE_GENRES = [
  { label: "Action", icon: Zap, href: "/browse?genre=action" },
  { label: "Sci-Fi", icon: Globe, href: "/browse?genre=sci-fi" },
  { label: "Drama", icon: BookOpen, href: "/browse?genre=drama" },
  { label: "Thriller", icon: Star, href: "/browse?genre=thriller" },
  { label: "Comedy", icon: Clapperboard, href: "/browse?genre=comedy" },
  { label: "Series", icon: Tv, href: "/browse?type=series" },
];

const Navbar = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/browse?query=${encodeURIComponent(query)}` : "/browse");
  };

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
            {/* Browse Mega-Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground hover:text-primary data-[state=open]:text-primary transition-colors h-auto p-0 gap-1">
                    Browse
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-6 bg-background/95 backdrop-blur-xl border border-border shadow-2xl">
                      <div className="mb-4 pb-4 border-b border-border/50">
                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">
                          Browse by Categorie
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {BROWSE_GENRES.map((genre) => (
                          <Link
                            key={genre.label}
                            href={genre.href}
                            className="group flex items-center gap-3 p-3 border border-border/50 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                          >
                            <genre.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                              {genre.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <Link
                          href="/browse"
                          className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-colors"
                        >
                          View All Cinema →
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Other nav links */}
            {PUBLIC_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 relative group/link ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover/link:w-full"
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

                  {/* Genre section */}
                  <div className="pt-6 pb-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.5em] text-primary px-3 mb-3">
                      Browse by Categorie
                    </p>
                    {BROWSE_GENRES.map((genre) => (
                      <Link
                        key={genre.label}
                        href={genre.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 p-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                      >
                        <genre.icon className="h-3.5 w-3.5" />
                        {genre.label}
                      </Link>
                    ))}
                  </div>
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
