import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Model from "@/models";
import { State } from "@/logic";
import { second } from "@/utils";

type Position = Model.Geo.Position;
const Status = Model.Geo.Status;

const GeoOptions: PositionOptions = {
  timeout: second(15),
};

function getGeolocation() {
  if ("geolocation" in navigator) {
    return navigator.geolocation;
  }

  return undefined;
}

function getCurrentPositionByIP(): Promise<Position> {
  return fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => ({
      lat: data.latitude,
      lng: data.longitude,
    }));
}

function getCurrentPositionByGeolocation(geo?: Geolocation): Promise<Position> {
  if (!geo) {
    return Promise.reject({
      code: Status.NOT_SUPPORTED,
      message: "Geolocation is not supported by this browser",
    });
  }

  return new Promise<GeolocationPosition>((resolve, reject) =>
    geo.getCurrentPosition(resolve, reject, GeoOptions)
  ).then((position) => ({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }));
}

/**
 * Get the current position of the user.
 * This will first try to use the geolocation API,
 * and if that fails, it will fall back to using the IP address.
 *
 * @returns {Position} A promise that resolves to the current position.
 */
const fetchGeo = createAsyncThunk<Position, void, { rejectValue: Error }>(
  "geo/fetch",
  (_, { rejectWithValue }) =>
    getCurrentPositionByGeolocation(getGeolocation())
      //
      .catch((error) => {
        switch (error?.code) {
          case Status.NOT_SUPPORTED:
          case Status.PERMISSION_DENIED:
          case Status.POSITION_UNAVAILABLE:
          case Status.TIMEOUT:
            return getCurrentPositionByIP().catch(rejectWithValue);
        }

        console.error("unexpected error occured: ", error);
        return rejectWithValue(error);
      })
);

interface GeoState {
  position: Position | undefined;
  error: string | undefined;
}

const initialState: GeoState = {
  position: undefined,
  error: undefined,
};

export const geo = createSlice({
  name: "geo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGeo.fulfilled, (state, action) => {
      Object.assign(state, {
        position: action.payload,
        error: undefined,
      });
    });

    builder.addCase(fetchGeo.rejected, (state, action) => {
      Object.assign(state, {
        error: action.payload,
      });
    });
  },
});

export const Geo = {
  fetch: fetchGeo,
  selectPosition: (state: State) => state.geo.position,
};
