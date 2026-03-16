import type { ArtistDetails, ArtistOut } from "../types";
import { get } from "./http";

export const artistsApi = {
  getArtists: (): Promise<ArtistOut[]> => get<ArtistOut[]>("/artists/featured"),

  getArtistsDetails: (id: number): Promise<ArtistDetails> =>
    get<ArtistDetails>(`/artists/details/${id}`),

  getSpotifyArtist: (spotifyId: string): Promise<unknown> =>
    get(`/artists/spotify/${spotifyId}`),
};
