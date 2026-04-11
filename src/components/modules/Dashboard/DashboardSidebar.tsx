"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Star,
  Bookmark,
  User,
  BarChart3,
  ShieldCheck,
  MessageSquare,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAuth } from "@/provider/auth-provider";
import { LogoutButton } from "@/components/ui/LogoutButton";

const USER_MENU = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "My Watchlist", href: "/dashboard/watchlist", icon: Bookmark },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
];

const ADMIN_MENU = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Manage Movies", href: "/dashboard/admin/movies", icon: Film },
  { label: "Review Moderation", href: "/dashboard/admin/reviews", icon: ShieldCheck },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "User Messages", href: "/dashboard/admin/messages", icon: MessageSquare },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const menu = isAdmin ? ADMIN_MENU : USER_MENU;

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-border px-4 py-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 bg-primary flex items-center justify-center shrink-0">
            <Film className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-black tracking-[0.2em] uppercase text-foreground group-data-[collapsible=icon]:hidden">
            FLICKS
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">
            {isAdmin ? "Admin Panel" : "My Account"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => {
                const active = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.label}
                      className="text-[10px] font-black uppercase tracking-wider"
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">
            Quick Access
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Browse Movies">
                  <Link href="/browse">
                    <Film className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      Browse Movies
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link href="/dashboard/profile">
                    <Settings className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      Settings
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        {user && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
              <div className="h-8 w-8 border border-primary/30 flex items-center justify-center bg-primary/5 shrink-0">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wider text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-[8px] font-bold uppercase text-primary tracking-widest">
                  {user.role}
                </p>
              </div>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <LogoutButton />
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
