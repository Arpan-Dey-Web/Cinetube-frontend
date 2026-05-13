export const animations = {
  page: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.28, ease: "easeOut" },
  },
  cardHover: {
    scale: 1.04,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  list: {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  },
  listItem: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  },
} as const;
