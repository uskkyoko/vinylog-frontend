import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AlbumOut } from "../types";
import { api } from "../api";

export const fetchFavouriteAlbums = createAsyncThunk(
  "users/fetchFavourites",
  (username: string): Promise<AlbumOut[]> => api.getFavouriteAlbums(username),
);

export const saveFavouriteAlbums = createAsyncThunk(
  "users/saveFavourites",
  (spotifyIds: string[]): Promise<AlbumOut[]> =>
    api.updateFavouriteAlbums(spotifyIds),
);

const usersSlice = createSlice({
  name: "users",
  initialState: { favouriteAlbums: [] as AlbumOut[] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouriteAlbums.fulfilled, (state, action) => {
        state.favouriteAlbums = action.payload;
      })
      .addCase(saveFavouriteAlbums.fulfilled, (state, action) => {
        state.favouriteAlbums = action.payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
