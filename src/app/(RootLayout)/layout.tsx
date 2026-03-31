import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/provider/auth-provider";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        {children}
        <Footer />
      </AuthProvider>
    </div>
  );
}
