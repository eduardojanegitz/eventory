import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./api";
import authReducer from "./auth/authSlice"
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";

export const store = configureStore({
    reducer: {
      global: globalReducer,
      [api.reducerPath]: api.reducer,
      auth: authReducer
    },
    middleware: (getDefault) => getDefault().concat(api.middleware)
  });
  setupListeners(store.dispatch);
