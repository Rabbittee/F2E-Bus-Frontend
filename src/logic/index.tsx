import { PropsWithChildren } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  Provider,
  useDispatch as useDispatchWith,
  useSelector as useSelectorWith,
} from "react-redux";

import { API } from "./api/api";
import { query, geo } from "./slices";
import { GeoProvider } from "./providers";

const store = configureStore({
  reducer: {
    [geo.name]: geo.reducer,
    [query.name]: query.reducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

setupListeners(store.dispatch);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export function useDispatch() {
  return useDispatchWith<Dispatch>();
}

export function useSelector<T>(selector: (state: State) => T) {
  return useSelectorWith<State, T>(selector);
}

export function StoreProvider({ children }: PropsWithChildren<{}>) {
  return (
    <Provider store={store}>
      <GeoProvider>{children}</GeoProvider>
    </Provider>
  );
}

export * from "./slices";
export * from "./api";
export * from "./hooks";
export * from "./functions";
