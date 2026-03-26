import React from "react";
import Link from "next/link";
import { Search, Film, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "../ui/ModeToggle";

const Navbar = () => {
  return (
    // Uses CSS variables for background and border to support both modes
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between ">
        {/* Logo - Updated to use Primary brand color */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-2xl text-primary"
        >
          <Film className="h-8 w-8" />
          <span className="hidden md:block tracking-tighter uppercase">
            FLICKS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-primary transition-colors">
                  Browse
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* Updated dropdown colors to match the card/popover variables */}
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover text-popover-foreground border border-border rounded-lg shadow-xl">
                    {[
                      "Action",
                      "Drama",
                      "Sci-Fi",
                      "Netflix",
                      "Disney+",
                      "Prime Video",
                    ].map((item) => (
                      <li key={item}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/search?q=${item}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {item}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/watchlist"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Watchlist
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative hidden sm:flex w-full max-w-sm items-center gap-2 px-4">
          <Search className="absolute left-7 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search movies, directors..."
            className="pl-10 bg-muted/50 border-border focus-visible:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            className="hidden sm:inline-flex hover:text-primary"
          >
            <Link href="/login">Log in</Link>
          </Button>
          {/* Main Action Button uses the dynamic Primary color */}
          <Button className="bg-primary text-primary-foreground hover:opacity-90">
            <Link href="/register" className="ml-2" >
              Join Now
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
