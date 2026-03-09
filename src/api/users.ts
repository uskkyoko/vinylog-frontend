import type { UserOut, UserUpdate, AlbumOut } from "../types";
import { get, mutateJSON, mutateVoid, authHeaders, UnauthorizedError } from "./http";

export const usersApi = {
  getCurrentUser: (username: string): Promise<UserOut> =>
    get<UserOut>(`/users/${username}`),

  getFavouriteAlbums: (username: string): Promise<AlbumOut[]> =>
    get<AlbumOut[]>(`/users/${username}/favourite-albums`),

  updateUser: (data: UserUpdate): Promise<UserOut> =>
    mutateJSON<UserOut>("/users/me", "PUT", data),

  updateFavouriteAlbums: (spotify_ids: string[]): Promise<AlbumOut[]> =>
    mutateJSON<AlbumOut[]>("/users/me/favourite-albums", "PUT", { spotify_ids }),

  uploadAvatar: (file: File): Promise<{ profile_picture: string }> => {
    const form = new FormData();
    form.append("profile_picture", file);
    return fetch("/api/users/me/avatar", {
      method: "POST",
      headers: authHeaders(),
      body: form,
    }).then((res) => {
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json();
    });
  },

  followUser: (username: string): Promise<void> =>
    mutateVoid(`/users/${username}/follow`, "POST"),

  unfollowUser: (username: string): Promise<void> =>
    mutateVoid(`/users/${username}/follow`, "DELETE"),
};
