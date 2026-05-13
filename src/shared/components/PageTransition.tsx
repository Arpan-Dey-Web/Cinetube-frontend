"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { animations } from "@/design-system/animations";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={animations.page.initial}
      animate={animations.page.animate}
      transition={animations.page.transition}
    >
      {children}
    </motion.div>
  );
}
