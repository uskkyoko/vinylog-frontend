import type { AlbumOut } from "./album";
import type { UserOut } from "./user";

export type ListType = "liked" | "hearlist" | "custom";

export interface ListCreate {
  name: string;
  list_type: ListType;
  description?: string | null;
}

export interface ListUpdate {
  name?: string | null;
  description?: string | null;
  albums?: AlbumOut[] | null;
}

export interface ListOut {
  id: number;
  name: string;
  list_type: ListType;
  description: string | null;
  created_at: string;
  updated_at: string | null;
  archived: boolean;
  albums: AlbumOut[];
  user: UserOut;
}
