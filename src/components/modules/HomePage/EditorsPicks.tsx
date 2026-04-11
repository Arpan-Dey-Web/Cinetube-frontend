import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const EditorsPicks = () => (
  <section className="py-16 container mx-auto px-4">
    <h2 className="text-2xl font-bold mb-8 border-l-4 border-primary pl-4 uppercase">
      Editor’s Picks
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
      {/* Featured Large Card */}
      <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
        <Image
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925"
          alt="Featured"
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
          <Badge className="w-fit mb-4 bg-primary uppercase">Must Watch</Badge>
          <h3 className="text-4xl font-bold text-white mb-2">
            Interstellar: 10th Anniversary
          </h3>
          <p className="text-gray-300 max-w-md mb-4 hidden md:block">
            Explore the masterpiece that redefined sci-fi cinema. Now streaming
            in 4K for premium members.
          </p>
          <Button className="w-fit bg-primary text-white">
            Read Full Review
          </Button>
        </div>
      </div>

      {/* Side Cards */}
      <div className="flex flex-col gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="relative flex-1 rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={
                i === 1
                  ? "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059"
                  : "https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=2070"
              }
              alt="Pick"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 p-4 flex items-end">
              <h4 className="text-white font-bold">
                {i === 1 ? "Top 10 Noir Films" : "Best of 2025"}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
