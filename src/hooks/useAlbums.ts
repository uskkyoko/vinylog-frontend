import type { AlbumOut, TrendingAlbumOut } from "../types";
import { api } from "../api";
import { useFetch } from "./useFetch";

export function useAlbums() {
  return useFetch<AlbumOut[]>(api.getAllAlbums, []);
}

export function useTrendingAlbums() {
  return useFetch<TrendingAlbumOut[]>(api.getTrendingAlbums, []);
}

export function useFeaturedAlbums() {
  return useFetch<AlbumOut[]>(api.getFeaturedAlbums, []);
}

export function useFeedAlbums() {
  return useFetch<AlbumOut[]>(api.getFeedAlbums, []);
}
