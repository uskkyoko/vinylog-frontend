import { api } from "../api";
import { useFetch } from "./useFetch";
import type { TrackOut } from "../types";

export function useAlbumTracks(spotifyId: string | null) {
  return useFetch(
    () => (spotifyId ? api.getAlbumTracks(spotifyId) : Promise.resolve([])),
    [] as TrackOut[],
    [spotifyId],
  );
}
