import type { AlbumOut, ListCreate } from "../types";
import { api } from "../api";
import { useFetch } from "./useFetch";

//not ready, just a start
export function useListManager(username: string) {
  const {
    data: lists,
    setData: setLists,
    loading,
    error,
  } = useFetch(() => api.getUserLists(username), []);

  async function createList(payload: ListCreate) {
    const newList = await api.createList(payload);
    setLists((prev) => [...prev, newList]);
  }

  async function deleteList(id: number) {
    await api.deleteList(id);
    setLists((prev) => prev.filter((l) => l.id !== id));
  }

  async function addAlbumToList(listId: number, album: AlbumOut) {
    const list = lists.find((l) => l.id === listId);
    if (!list || list.albums.some((a) => a.id === album.id)) return;
    const updated = await api.updateList(listId, {
      albums: [...list.albums, album],
    });
    setLists((prev) => prev.map((l) => (l.id === listId ? updated : l)));
  }

  async function removeAlbumFromList(listId: number, albumId: number) {
    const list = lists.find((l) => l.id === listId);
    if (!list) return;
    const updated = await api.updateList(listId, {
      albums: list.albums.filter((a) => a.id !== albumId),
    });
    setLists((prev) => prev.map((l) => (l.id === listId ? updated : l)));
  }

  return {
    lists,
    loading,
    error,
    createList,
    deleteList,
    addAlbumToList,
    removeAlbumFromList,
  };
}
