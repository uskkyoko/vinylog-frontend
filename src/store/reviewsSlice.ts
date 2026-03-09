import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ReviewOut, ReviewCreate, ReviewUpdate } from "../types";
import { api } from "../api";

export const fetchReviews = createAsyncThunk(
  "reviews/fetch",
  (username: string): Promise<ReviewOut[]> => api.getReviews(username),
);

export const createReview = createAsyncThunk(
  "reviews/create",
  (data: ReviewCreate): Promise<ReviewOut> => api.createReview(data),
);

export const updateReview = createAsyncThunk(
  "reviews/update",
  ({ id, data }: { id: number; data: ReviewUpdate }): Promise<ReviewOut> =>
    api.updateReview(id, data),
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id: number): Promise<number> => {
    await api.deleteReview(id);
    return id;
  },
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { items: [] as ReviewOut[] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.items = state.items.map((r) =>
          r.id === action.payload.id ? action.payload : r,
        );
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r.id !== action.payload);
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
