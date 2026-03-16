import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ListOut, ListCreate, ListUpdate, AlbumOut } from "../types";
import { api } from "../api";

export const fetchMyLists = createAsyncThunk(
  "lists/fetchMine",
  (): Promise<ListOut[]> => api.getMyLists(),
);

export const createList = createAsyncThunk(
  "lists/create",
  (data: ListCreate): Promise<ListOut> => api.createList(data),
);

export const updateList = createAsyncThunk(
  "lists/update",
  ({ id, data }: { id: number; data: ListUpdate }): Promise<ListOut> =>
    api.updateList(id, data),
);

export const deleteList = createAsyncThunk(
  "lists/delete",
  async (id: number): Promise<number> => {
    await api.deleteList(id);
    return id;
  },
);

export const addAlbumToList = createAsyncThunk(
  "lists/addAlbum",
  async ({
    listId,
    currentAlbums,
    album,
  }: {
    listId: number;
    currentAlbums: AlbumOut[];
    album: AlbumOut;
  }): Promise<ListOut | null> => {
    // 1. Prevent duplicates
    if (currentAlbums.some((a) => a.spotify_id === album.spotify_id))
      return null;

    // 2. Combine the old array with the newly selected album
    const combinedAlbums = [...currentAlbums, album];

    // 3. Extract JUST the string IDs for the backend
    const albumIdsOnly = combinedAlbums.map((a) => a.spotify_id);

    // 4. Send the updated payload structure
    return api.updateList(listId, { album_ids: albumIdsOnly });
  },
);

export const removeAlbumFromList = createAsyncThunk(
  "lists/removeAlbum",
  async ({
    listId,
    currentAlbums,
    albumId,
  }: {
    listId: number;
    currentAlbums: AlbumOut[];
    albumId: number;
  }): Promise<ListOut> => {
    return api.updateList(listId, {
      album_ids: currentAlbums
        .filter((a) => a.id !== albumId)
        .map((a) => a.spotify_id),
    });
  },
);

const listsSlice = createSlice({
  name: "lists",
  initialState: { items: [] as ListOut[] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyLists.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.items = state.items.map((l) =>
          l.id === action.payload.id ? action.payload : l,
        );
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter((l) => l.id !== action.payload);
      })
      .addCase(addAlbumToList.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.items = state.items.map((l) =>
          l.id === action.payload!.id ? action.payload! : l,
        );
      })
      .addCase(removeAlbumFromList.fulfilled, (state, action) => {
        state.items = state.items.map((l) =>
          l.id === action.payload.id ? action.payload : l,
        );
      });
  },
});

export const listsReducer = listsSlice.reducer;
