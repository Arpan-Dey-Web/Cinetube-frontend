export interface FiltersState {
  genres: string[];
  platforms: string[];
  minRating: number;
  yearFrom: number;
  yearTo: number;
  status: string;
  sort: string;
}

export const DEFAULT_FILTERS: FiltersState = {
  genres: [],
  platforms: [],
  minRating: 0,
  yearFrom: 2000,
  yearTo: new Date().getFullYear(),
  status: "all",
  sort: "rating-desc",
};

/** Matches browse grid page size; forwarded as API `limit`. */
export const BROWSE_PAGE_SIZE = 12;

export type BrowseSearchParamsInput = {
  searchTerm?: string;
  query?: string;
  page?: string;
  limit?: string;
  genre?: string | string[];
  platform?: string | string[];
  status?: string;
  sort?: string;
  rating?: string;
};

function normalizeParamList(value?: string | string[]) {
  if (!value) return [];
  const raw = Array.isArray(value) ? value : [value];
  return raw
    .map((entry) => decodeURIComponent(entry).trim())
    .filter(Boolean);
}

/** Maps UI sort keys to backend `sortBy` / `sortOrder`. */
export function sortUiToApi(sort: string): {
  sortBy: string;
  sortOrder: "asc" | "desc";
} {
  switch (sort) {
    case "year-desc":
      return { sortBy: "year", sortOrder: "desc" };
    case "year-asc":
      return { sortBy: "year", sortOrder: "asc" };
    case "title-asc":
      return { sortBy: "title", sortOrder: "asc" };
    case "rating-desc":
    default:
      return { sortBy: "rating", sortOrder: "desc" };
  }
}

/** Builds the query object sent to `GET /movie` from Next.js `searchParams`. */
export function buildApiQueryFromBrowseSearchParams(
  searchParams?: BrowseSearchParamsInput,
) {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const limitRaw = Number(searchParams?.limit) || BROWSE_PAGE_SIZE;
  const limit = Math.min(50, Math.max(1, limitRaw));

  const searchRaw = (searchParams?.searchTerm ?? searchParams?.query ?? "")
    .trim();
  const genres = normalizeParamList(searchParams?.genre);
  const platforms = normalizeParamList(searchParams?.platform);
  const status = searchParams?.status ?? DEFAULT_FILTERS.status;
  const sort = searchParams?.sort ?? DEFAULT_FILTERS.sort;
  const minRating = searchParams?.rating
    ? Number(searchParams.rating)
    : DEFAULT_FILTERS.minRating;

  const { sortBy, sortOrder } = sortUiToApi(sort);

  const query: Record<string, string | number> = {
    page,
    limit,
    sortBy,
    sortOrder,
  };

  if (searchRaw) {
    query.searchTerm = searchRaw;
  }

  if (genres.length > 0) {
    query.genres = genres.join(",");
  }

  if (platforms.length > 0) {
    query.platform = platforms[0];
  }

  if (status === "FREE" || status === "PREMIUM") {
    query.status = status;
  }

  if (!Number.isNaN(minRating) && minRating > 0) {
    query.minRating = minRating;
  }

  return query;
}

/** Serializes browse UI state into URLSearchParams for `router.push` / `<Link>`. */
export function serializeBrowseUrlParams(input: {
  search: string;
  filters: FiltersState;
  page: number;
  limit?: number;
}) {
  const p = new URLSearchParams();
  const term = input.search.trim();
  if (term) {
    p.set("searchTerm", term);
  }

  if (input.page > 1) {
    p.set("page", String(input.page));
  }

  const lim = input.limit ?? BROWSE_PAGE_SIZE;
  if (lim !== BROWSE_PAGE_SIZE) {
    p.set("limit", String(lim));
  }

  for (const g of input.filters.genres) {
    p.append("genre", encodeURIComponent(g));
  }

  for (const pl of input.filters.platforms) {
    p.append("platform", encodeURIComponent(pl));
  }

  if (input.filters.status !== "all") {
    p.set("status", input.filters.status);
  }

  if (input.filters.sort !== DEFAULT_FILTERS.sort) {
    p.set("sort", input.filters.sort);
  }

  if (input.filters.minRating > 0) {
    p.set("rating", String(input.filters.minRating));
  }

  return p.toString();
}

export function getInitialBrowseState(searchParams?: BrowseSearchParamsInput) {
  const initialGenres = normalizeParamList(searchParams?.genre);
  const initialPlatforms = normalizeParamList(searchParams?.platform);

  const page = Math.max(1, Number(searchParams?.page) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number(searchParams?.limit) || BROWSE_PAGE_SIZE),
  );

  return {
    page,
    limit,
    search:
      (searchParams?.searchTerm ?? searchParams?.query ?? "").trim(),
    filters: {
      ...DEFAULT_FILTERS,
      genres: initialGenres,
      platforms: initialPlatforms,
      status: searchParams?.status ?? DEFAULT_FILTERS.status,
      sort: searchParams?.sort ?? DEFAULT_FILTERS.sort,
      minRating: searchParams?.rating
        ? Number(searchParams.rating)
        : DEFAULT_FILTERS.minRating,
    },
  };
}
