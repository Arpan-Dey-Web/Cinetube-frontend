import React from "react";
import { Film } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card py-12 text-muted-foreground">
      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-2xl text-foreground">
            <Film className="h-6 w-6 text-primary" />
            <span className="tracking-tighter">FLICKS</span>
          </div>
          <p className="text-sm leading-relaxed">
            The ultimate portal for movie enthusiasts. Rate, review, and stream
            your favorite titles from across the globe.
          </p>
          <div className="flex gap-4">
            <FaFacebookF className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            <FaTwitter className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            <FaInstagram className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            <FaYoutube className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Dynamic Column Styling */}
        {[
          {
            title: "Platform",
            links: [
              { label: "All Movies", href: "/movies" },
              { label: "TV Series", href: "/series" },
              { label: "Trending", href: "/trending" },
              { label: "Subscription Plans", href: "/pricing" },
            ],
          },
          {
            title: "Support",
            links: [
              { label: "FAQ", href: "/faq" },
              { label: "Help Center", href: "/help" },
              { label: "Contact Us", href: "/contact" },
              { label: "Refund Policy", href: "/refunds" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-widest">
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-xs">
        <p>
          © {new Date().getFullYear()} FLICKS Media Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
