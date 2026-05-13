import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";
import { AuthProvider } from "@/providers/auth-provider";
import { StripeProvider } from "@/providers/StripeProvider";

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
