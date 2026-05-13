"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  /** Last applied search (URL / results). Used to toggle the action button. */
  committedSearch: string;
  onChange: (value: string) => void;
  onSubmitSearch: () => void;
  onClear: () => void;
};

export function BrowseSearchBar({
  value,
  committedSearch,
  onChange,
  onSubmitSearch,
  onClear,
}: Props) {
  const draft = value.trim();
  const committed = committedSearch.trim();
  const showClear =
    committed !== "" && draft === committed;

  return (
    <form
      className="relative flex-1 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3 group"
      onSubmit={(e) => {
        e.preventDefault();
        if (!showClear) onSubmitSearch();
      }}
    >
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
        <input
          name="searchTerm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a movie name, director, or genre…"
          className="w-full h-12 bg-card border border-border pl-11 pr-4 text-[11px] font-bold tracking-widest uppercase outline-none focus:border-primary transition-all placeholder:text-muted-foreground/40"
          autoComplete="off"
        />
      </div>
      {showClear ? (
        <Button
          type="button"
          variant="outline"
          className="h-12 shrink-0 px-8 text-[10px] font-black uppercase tracking-[0.2em]"
          onClick={onClear}
        >
          Clear
        </Button>
      ) : (
        <Button
          type="submit"
          className="h-12 shrink-0 px-8 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          Search
        </Button>
      )}
    </form>
  );
}
