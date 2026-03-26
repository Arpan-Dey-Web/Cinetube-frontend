import { Users, Star, Tv, PlayCircle } from "lucide-react";

const stats = [
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Reviews Submitted", value: "120K+", icon: Star },
  { label: "Movies & Series", value: "5,000+", icon: Tv },
  { label: "Streaming Hours", value: "2M+", icon: PlayCircle },
];

export const StatsSection = () => (
  <section className="py-12 bg-muted/30 border-y border-border">
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center space-y-2">
          <stat.icon className="h-6 w-6 text-primary mx-auto" />
          <h3 className="text-3xl font-bold tracking-tighter text-foreground">
            {stat.value}
          </h3>
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </section>
);
