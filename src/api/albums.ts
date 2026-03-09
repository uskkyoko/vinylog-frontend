import type { AlbumOut, AlbumSearchResult, TrackOut } from "../types";
import { get } from "./http";

export const albumsApi = {
  getAllAlbums: (): Promise<AlbumOut[]> => get<AlbumOut[]>("/albums/"),

  getAlbumDetails: (id: number): Promise<AlbumOut> =>
    get<AlbumOut>(`/albums/details/${id}`),

  getPopularAlbums: (): Promise<AlbumOut[]> =>
    get<AlbumOut[]>("/albums/popular"),

  getFeaturedAlbums: (): Promise<AlbumOut[]> =>
    get<AlbumOut[]>("/albums/featured"),

  searchAlbums: (q: string): Promise<AlbumSearchResult[]> =>
    get<AlbumSearchResult[]>(`/albums/search?q=${encodeURIComponent(q)}`),

  getAlbumTracks: (spotifyId: string): Promise<TrackOut[]> =>
    get<TrackOut[]>(`/albums/tracks/${spotifyId}`),
};
