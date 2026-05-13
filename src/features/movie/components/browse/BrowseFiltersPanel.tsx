"use client";
import { X, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ALL_GENRES, ALL_PLATFORMS } from "@/constants/catalog";
import { DEFAULT_FILTERS, type FiltersState } from "./filter-utils";

interface Props {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  totalCount: number;
  /** When false, release-year inputs are disabled (API browse uses server filters only). */
  yearFilterActive?: boolean;
}

const SORT_OPTIONS = [
  { value: "rating-desc", label: "Top Rated" },
  { value: "year-desc", label: "Newest First" },
  { value: "year-asc", label: "Oldest First" },
  { value: "title-asc", label: "A–Z" },
];

export function BrowseFiltersPanel({
  filters,
  onChange,
  totalCount,
  yearFilterActive = true,
}: Props) {
  const toggleGenre = (genre: string) => {
    const updated = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onChange({ ...filters, genres: updated });
  };

  const togglePlatform = (platform: string) => {
    const updated = filters.platforms.includes(platform)
      ? filters.platforms.filter((p) => p !== platform)
      : [...filters.platforms, platform];
    onChange({ ...filters, platforms: updated });
  };

  const clearAll = () => {
    onChange(DEFAULT_FILTERS);
  };

  const activeFilterCount =
    filters.genres.length +
    filters.platforms.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.yearFrom !== DEFAULT_FILTERS.yearFrom ||
    filters.yearTo !== DEFAULT_FILTERS.yearTo
      ? 1
      : 0) +
    (filters.status !== "all" ? 1 : 0);

  return (
    <aside className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-black uppercase tracking-[0.4em]">
            Filters
          </span>
          {activeFilterCount > 0 && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center text-[9px] rounded-full bg-primary">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground -mt-4">
        {totalCount} titles found
      </p>

      {/* Sort */}
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
          Sort By
        </p>
        <div className="space-y-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, sort: opt.value })}
              className={`w-full text-left p-2.5 text-[10px] font-black uppercase tracking-wider transition-all ${
                filters.sort === opt.value
                  ? "text-primary bg-primary/10 border-l-2 border-primary pl-4"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
          Access
        </p>
        <div className="space-y-1">
          {["all", "FREE", "PREMIUM"].map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, status: s })}
              className={`w-full text-left p-2.5 text-[10px] font-black uppercase tracking-wider transition-all ${
                filters.status === s
                  ? "text-primary bg-primary/10 border-l-2 border-primary pl-4"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All Titles" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">
            Min Rating
          </p>
          <span className="text-sm font-black italic text-foreground">
            {filters.minRating}+
          </span>
        </div>
        <Slider
          value={[filters.minRating]}
          onValueChange={([val]) => onChange({ ...filters, minRating: val })}
          min={0}
          max={10}
          step={1}
          className="py-1"
        />
      </div>

      <div
        className={
          yearFilterActive ? "" : "opacity-50 pointer-events-none select-none"
        }
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">
            Release Year
          </p>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            {filters.yearFrom} - {filters.yearTo}
          </span>
        </div>
        {!yearFilterActive && (
          <p className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Year range applies when browsing the offline catalog.
          </p>
        )}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            value={filters.yearFrom}
            min={1900}
            max={filters.yearTo}
            disabled={!yearFilterActive}
            onChange={(event) =>
              onChange({
                ...filters,
                yearFrom: Number(event.target.value),
              })
            }
            className="h-11 border border-border bg-background px-3 text-sm font-medium outline-none transition-colors focus:border-primary disabled:cursor-not-allowed"
          />
          <input
            type="number"
            value={filters.yearTo}
            min={filters.yearFrom}
            max={new Date().getFullYear()}
            disabled={!yearFilterActive}
            onChange={(event) =>
              onChange({
                ...filters,
                yearTo: Number(event.target.value),
              })
            }
            className="h-11 border border-border bg-background px-3 text-sm font-medium outline-none transition-colors focus:border-primary disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Genres */}
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
          Genre
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_GENRES.map((genre) => {
            const active = filters.genres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platforms */}
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
          Platform
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_PLATFORMS.map((platform) => {
            const active = filters.platforms.includes(platform);
            return (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest border transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {platform}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
