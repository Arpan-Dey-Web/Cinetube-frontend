"use client";

import { SlidersHorizontal } from "lucide-react";
import { MovieCard } from "@/features/home/components/MovieCard";
import { BrowseFiltersPanel } from "./BrowseFiltersPanel";
import type { BrowseMovieGridProps } from "./browse-movie-grid.types";
import { BrowseMovieGridSkeleton } from "./BrowseMovieGridSkeleton";
import { BrowseMoviePagination } from "./BrowseMoviePagination";
import { BrowseSearchBar } from "./BrowseSearchBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useBrowseMovieGrid } from "./useBrowseMovieGrid";

export function BrowseMovieGrid(props: BrowseMovieGridProps) {
  const { isLoading } = props;
  const {
    pathname,
    serverPaginated,
    searchDraft,
    committedSearch,
    setSearchDraft,
    applySearch,
    clearSearch,
    filters,
    handleFilterChange,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    totalCount,
    totalPages,
    paginated,
    effectivePage,
    page,
    setPage,
    browseQueryString,
    resetAll,
  } = useBrowseMovieGrid(props);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <aside className="hidden lg:block w-64 shrink-0">
        <BrowseFiltersPanel
          filters={filters}
          onChange={handleFilterChange}
          totalCount={totalCount}
          yearFilterActive={!serverPaginated}
        />
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-10">
          <BrowseSearchBar
            value={searchDraft}
            committedSearch={committedSearch}
            onChange={setSearchDraft}
            onSubmitSearch={applySearch}
            onClear={clearSearch}
          />

          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="lg:hidden h-12 w-12 border border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors shrink-0 self-end sm:self-auto"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background p-6">
              <BrowseFiltersPanel
                filters={filters}
                onChange={(f) => {
                  handleFilterChange(f);
                  setMobileFiltersOpen(false);
                }}
                totalCount={totalCount}
                yearFilterActive={!serverPaginated}
              />
            </SheetContent>
          </Sheet>
        </div>

        {isLoading ? (
          <BrowseMovieGridSkeleton />
        ) : paginated.length === 0 ? (
          <div className="h-64 border border-dashed border-border flex flex-col items-center justify-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">
              No Titles Found
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="text-[9px] font-black uppercase tracking-widest text-primary hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y border-border/60 py-4">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                {totalCount} titles match your current search
              </p>
              <div className="flex flex-wrap gap-2">
                {filters.genres.map((genre) => (
                  <span
                    key={genre}
                    className="border border-border bg-card px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-foreground"
                  >
                    {genre}
                  </span>
                ))}
                {filters.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="border border-border bg-card px-3 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-foreground"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16">
              {paginated.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  rating={movie.rating}
                  year={movie.year}
                  image={movie.posterUrl}
                  category={movie.genres[0] || "Cinema"}
                />
              ))}
            </div>

            {totalPages > 1 &&
              (serverPaginated ? (
                <BrowseMoviePagination
                  mode="server"
                  pathname={pathname}
                  totalPages={totalPages}
                  effectivePage={effectivePage}
                  buildQuery={browseQueryString}
                />
              ) : (
                <BrowseMoviePagination
                  mode="client"
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
