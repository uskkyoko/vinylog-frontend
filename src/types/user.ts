import type { AlbumOut } from "./album";
import type { ReviewOut } from "./review";
import type { ListOut } from "./list";

export interface UserUpdate {
  full_name?: string | null;
  biography?: string | null;
  birth_date?: string | null;
  profile_picture?: string | null;
}

export interface AdminUserUpdate extends UserUpdate {
  username?: string | null;
  email?: string | null;
  role?: string | null;
  archived?: boolean | null;
}

export interface UserOut {
  id: number;
  username: string;
  full_name: string;
  biography: string | null;
  birth_date: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string | null;
  favourite_albums: AlbumOut[];
  followers: UserOut[];
  following: UserOut[];
  reviews: ReviewOut[];
  lists: ListOut[];
}

export interface AdminUserOut extends UserOut {
  email: string;
  role: string;
  archived: boolean;
}
