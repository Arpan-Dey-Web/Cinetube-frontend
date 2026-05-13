import React from "react";
import { Film } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import {
  FOOTER_SECTIONS,
  SOCIAL_LINKS,
} from "@/lib/site-content";

const SOCIAL_ICONS = {
  Facebook: FaFacebookF,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
};

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card py-12 text-muted-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 md:grid-cols-4 lg:px-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-2xl text-foreground">
            <Film className="h-6 w-6 text-primary" />
            <span className="tracking-tighter">FLICKS</span>
          </div>
          <p className="text-sm leading-relaxed">
            A cinematic portal for discovery, reviews, watchlists, and premium
            streaming access built for movie lovers and moderators alike.
          </p>
          <div className="space-y-1 text-sm">
            <p>support@cinetube.com</p>
            <p>+880 1700-000000</p>
            <p>Dhaka, Bangladesh</p>
          </div>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.label];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="transition-colors hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        {FOOTER_SECTIONS.map((section) => (
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

      <div className="container mx-auto mt-12 border-t border-border/50 px-6 pt-8 text-center text-xs lg:px-12">
        <p>
          © {new Date().getFullYear()} FLICKS Media Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
