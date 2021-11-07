import { createSlice } from "@reduxjs/toolkit";
import { State } from "@/logic";

interface QueryState {
  query: string;
}

const initialState: QueryState = {
  query: "",
};

export const query = createSlice({
  name: "query",
  initialState,
  reducers: {
    update(state, action) {
      state.query = action.payload;
    },
  },
});

export const Query = {
  ...query.actions,
  selectQuery: (state: State) => state.query.query,
};
