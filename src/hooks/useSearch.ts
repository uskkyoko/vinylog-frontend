import { api } from "../api";
import { useFetch } from "./useFetch";
import type { SearchResults } from "../types";

const EMPTY: SearchResults = {
  spotify_artists: [],
  spotify_albums: [],
  users: [],
  lists: [],
};

export function useSearch(query: string) {
  return useFetch(
    () => (query ? api.search(query) : Promise.resolve(EMPTY)),
    EMPTY,
    [query],
  );
}
