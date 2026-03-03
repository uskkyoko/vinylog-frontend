import type { AlbumOut } from "../types";
import { api } from "../api";
import { useFetch } from "./useFetch";

export function useAlbums() {
  return useFetch<AlbumOut[]>(api.getAllAlbums, []);
}

export function usePopularAlbums() {
  return useFetch<AlbumOut[]>(api.getPopularAlbums, []);
}

export function useFeaturedAlbums() {
  return useFetch<AlbumOut[]>(api.getFeaturedAlbums, []);
}
