import Image from "next/image";
import { Play, Star } from "lucide-react";
import Link from "next/link";

interface MovieProps {
  id: string;
  title: string;
  rating: number;
  year: string;
  image: string;
  category: string;
}

export const MovieCard = ({
  id,
  title,
  rating,
  year,
  image,
  category,
}: MovieProps) => {
  return (
    <Link href={`/browse/${id}`}>
      <div className="group relative cursor-pointer">
        {/* Editorial Shadow/Focus Bar */}
        <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 grayscale-[0.2] group-hover:scale-110 group-hover:grayscale-0"
          />

          {/* Minimalist Hover State */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
            <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Play className="fill-primary-foreground text-primary-foreground h-5 w-5 ml-1" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">
              {category}
            </span>
            <p className="text-white text-lg font-black uppercase italic leading-none tracking-tighter">
              {title}
            </p>
          </div>
        </div>

        <div className="py-4 space-y-1">
          <h3 className="text-[11px] font-black uppercase tracking-wider text-foreground truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <span>{year}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-foreground">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
