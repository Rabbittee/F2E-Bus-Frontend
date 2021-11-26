import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTransform } from "redux-persist";
import { State } from "@/logic";
import { day } from "@/utils";
import * as Model from "@/models";
import { identity } from "ramda";

interface QueryRecord extends Model.Query {
  createdAt: number;
}

interface QueryState {
  query: string;
  history: QueryRecord[];
}

const initialState: QueryState = {
  query: "",
  history: [],
};

export const query = createSlice({
  name: "query",
  initialState,
  reducers: {
    update(state, action) {
      state.query = action.payload;
    },
    record(state, action: PayloadAction<Model.Query>) {
      if (state.history.find(({ id }) => id === action.payload.id)) return;

      state.history.unshift({
        ...action.payload,
        createdAt: Date.now(),
      });

      state.history = state.history.slice(0, 5);
    },
  },
});

const ExpireTime = day(7);

export function ExpireQuery() {
  return createTransform(
    identity,
    (outbound: QueryState) => {
      return {
        ...outbound,
        history: outbound.history.filter(
          ({ createdAt }) => Date.now() - createdAt < ExpireTime
        ),
      };
    },

    { whitelist: ["query"] }
  );
}

export const Query = {
  ...query.actions,
  selectQuery: (state: State) => state.query.query,
  selectQueryHistory: (state: State) => state.query.history,
};
