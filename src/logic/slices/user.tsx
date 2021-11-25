import { State } from "@/logic";
import { day } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { createTransform } from "redux-persist";

type Setting = undefined | true | false;

interface UserState {
  geo: Setting;
}

const initialState: UserState = {
  geo: undefined,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    enableGeo(state, action) {
      state.geo = action.payload;
    },
  },
});

const ExpireTime = day(1);

export function ExpireUser() {
  return createTransform(
    (inbound: UserState) => ({ ...inbound, expired: Date.now() + ExpireTime }),

    (outbound: UserState & { expired: number }) =>
      Date.now() > outbound.expired ? initialState : outbound,

    { whitelist: ["user"] }
  );
}

export const User = {
  ...user.actions,
  selectEnableGeo: (state: State) => state.user.geo,
  selectHasAskedGeo: (state: State) => state.user.geo !== undefined,
};
