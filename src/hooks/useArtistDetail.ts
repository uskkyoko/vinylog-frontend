import { useFetch } from "./useFetch";
import { api } from "../api";
import type { ArtistDetails } from "../types";

export function useArtistDetail(artistId: number) {
  return useFetch<ArtistDetails | null>(
    async () => {
      const initial = await api.getArtistsDetails(artistId);
      if (initial.spotify_id && initial.albums.length === 0) {
        await api.getSpotifyArtist(initial.spotify_id).catch(() => {});
        return api.getArtistsDetails(artistId);
      }
      return initial;
    },
    null,
    [artistId],
  );
}
