import { useState, useEffect } from "react";
import { api } from "../api";
import type { AlbumSearchResult } from "../types";

export function useAlbumSearch(query: string) {
  const [results, setResults] = useState<AlbumSearchResult[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setError(null);
    api.searchAlbums(query).then(setResults).catch(setError);
  }, [query]);

  return { results, error };
}
