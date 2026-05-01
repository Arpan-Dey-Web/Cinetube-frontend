import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/provider/auth-provider";
import { StripeProvider } from "@/provider/StripeProvider";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <StripeProvider>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </StripeProvider>
    </div>
  );
}
