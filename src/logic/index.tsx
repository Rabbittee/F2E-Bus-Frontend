import { PropsWithChildren } from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  Provider,
  useDispatch as useDispatchWith,
  useSelector as useSelectorWith,
} from "react-redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import { API } from "./api/api";
import { GeoProvider } from "./providers";
import { query, geo, user, ExpireUser } from "./slices";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  transforms: [ExpireUser()],
};

const store = configureStore({
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      [geo.name]: geo.reducer,
      [query.name]: query.reducer,
      [user.name]: user.reducer,
      [API.reducerPath]: API.reducer,
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(API.middleware),
});

const persistor = persistStore(store);

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
      <PersistGate loading={null} persistor={persistor}>
        <GeoProvider>{children}</GeoProvider>
      </PersistGate>
    </Provider>
  );
}

export * from "./slices";
export * from "./api";
export * from "./hooks";
export * from "./functions";
