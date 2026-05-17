import { AuthProvider } from "@/providers/auth-provider";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DashboardTopbar } from "@/features/dashboard/components/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className="bg-background min-h-screen">
          {/* Top bar */}
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-md px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground -ml-1" />
            <Separator orientation="vertical" className="h-5 bg-border" />
            <div className="flex flex-1 items-center justify-between">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                Command Center
              </p>
              <DashboardTopbar />
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
