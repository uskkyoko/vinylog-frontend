import { configureStore } from "@reduxjs/toolkit";
import { listsReducer } from "./store/listsSlice";
import { reviewsReducer } from "./store/reviewsSlice";
import { usersReducer } from "./store/usersSlice";

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    reviews: reviewsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
