import { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import API from "./api";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

type Props = {
  children: ReactNode;
};
export function StoreProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

setupListeners(store.dispatch);

export { API };
