import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type appDistach = typeof store.dispatch;
