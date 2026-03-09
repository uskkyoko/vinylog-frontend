import type { ArtistOut } from "../types";
import { get } from "./http";

export const artistsApi = {
  getArtists: (): Promise<ArtistOut[]> => get<ArtistOut[]>("/artists/featured"),
};
