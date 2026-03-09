import type { SearchResults } from "../types";
import { get } from "./http";

export const searchApi = {
  search: (q: string): Promise<SearchResults> =>
    get<SearchResults>(`/search?q=${encodeURIComponent(q)}`),
};
