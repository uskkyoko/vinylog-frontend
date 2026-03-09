import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ListOut, ListCreate, AlbumOut } from "../types";
import { api } from "../api";

export const fetchMyLists = createAsyncThunk(
  "lists/fetchMine",
  (): Promise<ListOut[]> => api.getMyLists(),
);

export const createList = createAsyncThunk(
  "lists/create",
  (data: ListCreate): Promise<ListOut> => api.createList(data),
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
    if (currentAlbums.some((a) => a.id === album.id)) return null;
    return api.updateList(listId, { albums: [...currentAlbums, album] });
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
      albums: currentAlbums.filter((a) => a.id !== albumId),
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
