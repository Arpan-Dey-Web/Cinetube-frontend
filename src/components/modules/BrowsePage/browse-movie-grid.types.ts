import type { MoviesListMeta } from "@/services/modules/movie/movie.service";
import { Movie } from "@/types/types";
import type { FiltersState } from "./filter-utils";

export type BrowseMovieGridProps = {
  movies: Movie[];
  initialSearch?: string;
  initialFilters?: FiltersState;
  initialPage?: number;
  browseLimit?: number;
  paginationMeta?: MoviesListMeta | null;
  urlSyncKey?: string;
  isLoading?: boolean;
};
