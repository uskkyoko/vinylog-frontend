import type { ArtistOut } from "../types";
import { api } from "../api";
import { useFetch } from "./useFetch";

export function useArtists() {
  return useFetch<ArtistOut[]>(api.getArtists, []);
}
