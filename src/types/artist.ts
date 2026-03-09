import type { AlbumOut } from "./album";

export interface ArtistCreate {
  name: string;
  biography?: string | null;
  debut_date?: string | null;
  profile_picture?: string | null;
}

export interface ArtistUpdate {
  name?: string | null;
  biography?: string | null;
  debut_date?: string | null;
  profile_picture?: string | null;
}

export interface ArtistOut {
  id: number;
  name: string;
  biography: string | null;
  debut_date: string | null;
  profile_picture: string | null;
  archived: boolean;
  albums: AlbumOut[];
}
