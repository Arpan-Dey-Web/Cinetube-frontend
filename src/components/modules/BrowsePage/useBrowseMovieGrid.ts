"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { BrowseMovieGridProps } from "./browse-movie-grid.types";
import {
  BROWSE_PAGE_SIZE,
  DEFAULT_FILTERS,
  serializeBrowseUrlParams,
  type FiltersState,
} from "./filter-utils";

export function useBrowseMovieGrid({
  movies,
  initialSearch = "",
  initialFilters = DEFAULT_FILTERS,
  initialPage = 1,
  browseLimit = BROWSE_PAGE_SIZE,
  paginationMeta = null,
  urlSyncKey = "",
}: BrowseMovieGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const serverPaginated = paginationMeta != null;

  const [searchDraft, setSearchDraft] = useState(initialSearch);
  const [committedSearch, setCommittedSearch] = useState(initialSearch);
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [page, setPage] = useState(initialPage);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchDraft(initialSearch);
    setCommittedSearch(initialSearch);
    setFilters(initialFilters);
    setPage(initialPage);
  }, [urlSyncKey, initialSearch, initialFilters, initialPage]);

  const pushBrowseUrl = useCallback(
    (next: { search: string; filters: FiltersState; page: number }) => {
      const qs = serializeBrowseUrlParams({
        search: next.search,
        filters: next.filters,
        page: next.page,
        limit: browseLimit,
      });
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname, browseLimit],
  );

  const applySearch = useCallback(() => {
    const term = searchDraft.trim();
    if (serverPaginated) {
      pushBrowseUrl({ search: term, filters, page: 1 });
    } else {
      setCommittedSearch(term);
      setPage(1);
    }
  }, [searchDraft, serverPaginated, filters, pushBrowseUrl]);

  const clearSearch = useCallback(() => {
    setSearchDraft("");
    if (serverPaginated) {
      pushBrowseUrl({ search: "", filters, page: 1 });
    } else {
      setCommittedSearch("");
      setPage(1);
    }
  }, [serverPaginated, filters, pushBrowseUrl]);

  const filtered = useMemo(() => {
    if (serverPaginated) {
      return movies;
    }

    let result = [...movies];

    if (committedSearch.trim()) {
      const q = committedSearch.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.platform.toLowerCase().includes(q) ||
          m.cast.some((member) => member.toLowerCase().includes(q)) ||
          m.genres.some((g) => g.toLowerCase().includes(q)),
      );
    }

    if (filters.genres.length > 0) {
      result = result.filter((m) =>
        m.genres.some((g) => filters.genres.includes(g)),
      );
    }

    if (filters.platforms.length > 0) {
      result = result.filter((m) => filters.platforms.includes(m.platform));
    }

    if (filters.minRating > 0) {
      result = result.filter((m) => m.rating >= filters.minRating);
    }

    result = result.filter((movie) => {
      const year = Number(movie.year);
      return year >= filters.yearFrom && year <= filters.yearTo;
    });

    if (filters.status !== "all") {
      result = result.filter((m) => m.status === filters.status);
    }

    switch (filters.sort) {
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "year-desc":
        result.sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case "year-asc":
        result.sort((a, b) => Number(a.year) - Number(b.year));
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [movies, committedSearch, filters, serverPaginated]);

  const effectivePage = serverPaginated ? initialPage : page;
  const totalCount =
    serverPaginated && paginationMeta
      ? paginationMeta.total
      : filtered.length;
  const totalPages =
    serverPaginated && paginationMeta
      ? Math.max(1, paginationMeta.totalPages)
      : Math.max(1, Math.ceil(filtered.length / BROWSE_PAGE_SIZE));
  const paginated = serverPaginated
    ? filtered
    : filtered.slice(
        (effectivePage - 1) * BROWSE_PAGE_SIZE,
        effectivePage * BROWSE_PAGE_SIZE,
      );

  const browseQueryString = useCallback(
    (pageNum: number) =>
      serializeBrowseUrlParams({
        search: committedSearch,
        filters,
        page: pageNum,
        limit: browseLimit,
      }),
    [committedSearch, filters, browseLimit],
  );

  const handleFilterChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
    if (serverPaginated) {
      pushBrowseUrl({
        search: committedSearch,
        filters: newFilters,
        page: 1,
      });
    } else {
      setPage(1);
    }
  };

  const resetAll = () => {
    setSearchDraft("");
    setCommittedSearch("");
    setFilters(DEFAULT_FILTERS);
    if (serverPaginated) {
      router.push(pathname);
    } else {
      setPage(1);
    }
  };

  return {
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
  };
}
