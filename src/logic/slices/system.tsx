import { State } from "@/logic";
import { createSlice, AnyAction, AsyncThunk } from "@reduxjs/toolkit";
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
    loading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.match(/^(api\/executeQuery|geo\/fetch)/g),
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
      state.error = action.payload;
    });
  },
});

export const System = {
  ...system.actions,
  selectLoading: (state: State) => state.system.loading,
  selectCurrentAction: (state: State) => state.system.currentAction,
};
