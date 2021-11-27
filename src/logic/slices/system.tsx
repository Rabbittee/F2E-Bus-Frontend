import { State } from "@/logic";
import {
  createSlice,
  AnyAction,
  AsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { anyPass } from "ramda";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, { rejectValue: string }>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith("/pending");
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith("/fulfilled");
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("/rejected");
}

namespace RTK {
  type GenericAsyncThunk = AsyncThunk<
    unknown,
    unknown,
    { rejectValue: FetchBaseQueryError & { data: { type: string } } }
  >;

  export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
  export type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
  export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
  export type Action = PendingAction | RejectedAction | FulfilledAction;

  export function isExecuteQueryAction(action: AnyAction): action is Action {
    return action.type.match(/^(api\/executeQuery)/g);
  }

  export function isRejectedAction(
    action: AnyAction
  ): action is RejectedAction {
    return action.type.endsWith("/rejected");
  }
}

function isGeoFetchAction(action: AnyAction): action is AnyAction {
  return action.type.match(/^(geo\/fetch)/g);
}

interface SystemState {
  currentAction?: string;
  loading: boolean;
  error?: string;
}

const initialState: SystemState = {
  currentAction: undefined,
  loading: false,
  error: undefined,
};

export const system = createSlice({
  name: "system",
  initialState,
  reducers: {
    loading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    error(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      anyPass([isGeoFetchAction, RTK.isExecuteQueryAction]),
      (state, action) => {
        state.loading = isPendingAction(action);
      }
    );
    builder.addMatcher(isPendingAction, (state, action) => {
      state.currentAction = action.type;
    });

    builder.addMatcher(
      anyPass([isFulfilledAction, isRejectedAction]),
      (state) => {
        state.currentAction = undefined;
      }
    );

    builder.addMatcher(isRejectedAction, (state, action) => {
      if (
        RTK.isExecuteQueryAction(action) &&
        RTK.isRejectedAction(action) &&
        action.payload
      ) {
        console.error(`Error occured during [${action.type}]`, action.payload);

        state.error = action.payload?.data?.type;
        return;
      }

      state.error = action.payload;
    });
  },
});

export const System = {
  ...system.actions,
  selectLoading: (state: State) =>
    state.system.loading as SystemState["loading"],

  selectCurrentAction: (state: State) =>
    state.system.currentAction as SystemState["currentAction"],

  selectError: (state: State) => state.system.error as SystemState["error"],
};
