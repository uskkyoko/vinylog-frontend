import {
  type ReviewOut,
  type AlbumOut,
  type AlbumSearchResult,
  type ArtistOut,
  type ListOut,
  type ListCreate,
  type ListUpdate,
  type UserOut,
} from "./types";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  //─────── User ──────────────────────────────────────────────────────────
  getCurrentUser: (username: string) => get<UserOut>(`/users/${username}`), //for now without auth

  //─────── Reviews ──────────────────────────────────────────────────────────
  getReviews: (username: string) => get<ReviewOut[]>(`/reviews/${username}`),

  //─────── Albums ──────────────────────────────────────────────────────────
  getAllAlbums: () => get<AlbumOut[]>("/albums/"),
  getPopularAlbums: () => get<AlbumOut[]>("/albums/popular"),
  getFeaturedAlbums: () => get<AlbumOut[]>("/albums/featured"),
  searchAlbums: (q: string) =>
    get<AlbumSearchResult[]>(`/albums/search?q=${encodeURIComponent(q)}`),

  //─────── Artists ──────────────────────────────────────────────────────────
  getArtists: () => get<ArtistOut[]>("/artists/"),

  //─────── Lists ──────────────────────────────────────────────────────────
  getLists: () => get<ListOut[]>("/lists/"),
  getMyLists: () => get<ListOut[]>("/my-lists/"),
  getUserLists: (username: string) => get<ListOut[]>(`/lists/${username}`), //by username

  createList: (data: ListCreate): Promise<ListOut> =>
    fetch("/lists/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    }),

  updateList: (id: number, data: ListUpdate): Promise<ListOut> =>
    fetch(`/lists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    }),

  deleteList: (id: number): Promise<void> =>
    fetch(`/lists/${id}`, { method: "DELETE" }).then((res) => {
      if (!res.ok) throw new Error(`${res.status}`);
    }),

  updateUser: (data: FormData): Promise<UserOut> =>
    fetch("/users/me", { method: "PUT", body: data }).then((res) => {
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return res.json() as Promise<UserOut>;
    }),
};
