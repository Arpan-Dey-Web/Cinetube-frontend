import { User, Video, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const MovieSidebar = ({
  cast,
  director,
}: {
  cast: string[];
  director: string;
}) => (
  <div className="bg-card/50 border border-border p-8 rounded-2xl sticky top-24 space-y-8 backdrop-blur-sm">
    <div>
      <h4 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-4">
        <Video className="h-4 w-4" /> Director
      </h4>
      <p className="text-lg font-semibold text-foreground">{director}</p>
    </div>

    <Separator className="bg-border/50" />

    <div>
      <h4 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-4">
        <User className="h-4 w-4" /> Starring
      </h4>
      <ul className="space-y-4">
        {cast.map((actor) => (
          <li
            key={actor}
            className="group flex items-center justify-between cursor-default"
          >
            <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
              {actor}
            </span>
            <div className="h-1 w-1 rounded-full bg-border group-hover:bg-primary group-hover:scale-150 transition-all" />
          </li>
        ))}
      </ul>
    </div>

    <Separator className="bg-border/50" />

    <div className="pt-2">
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex gap-3">
        <Info className="h-5 w-5 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          This title is available for{" "}
          <span className="text-primary font-bold">Rent</span> and{" "}
          <span className="text-primary font-bold">Purchase</span> for Premium
          subscribers.
        </p>
      </div>
    </div>
  </div>
);
