import { useState, useEffect } from "react";
import { api } from "../api";
import type { AlbumSearchResult } from "../types";

export function useAlbumSearch(query: string): AlbumSearchResult[] {
  const [results, setResults] = useState<AlbumSearchResult[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    api.searchAlbums(query).then(setResults).catch(console.error);
  }, [query]);

  return results;
}
