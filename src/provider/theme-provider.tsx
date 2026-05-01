"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client after the first render
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and the very first hydration pass, we render a plain
  // fragment. This prevents the "script tag" error.
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
