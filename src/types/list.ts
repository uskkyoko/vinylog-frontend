import type { AlbumOut } from "./album";
import type { UserOut } from "./user";

export interface ListCreate {
  name: string;
  list_type: string;
  description?: string | null;
}

export interface ListUpdate {
  name?: string | null;
  description?: string | null;
  album_ids?: string[] | null;
}

export interface ListOut {
  id: number;
  name: string;
  list_type: string;
  description: string | null;
  created_at: string;
  updated_at: string | null;
  archived: boolean;
  albums: AlbumOut[];
  user: UserOut;
}
