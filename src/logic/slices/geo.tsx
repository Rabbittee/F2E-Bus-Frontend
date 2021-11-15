import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Model from "@/models";
import { State } from "@/logic";
import { second, minute } from "@/utils";

type Position = Model.Geo.Position;
const Status = Model.Geo.Status;

const GeoOptions: PositionOptions = {
  timeout: second(5),
  maximumAge: minute(3),
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
      lon: data.longitude,
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
    lon: position.coords.longitude,
  }));
}

/**
 * Get the current position of the user.
 * This will first try to use the geolocation API,
 * and if that fails, it will fall back to using the IP address.
 *
 * @returns {Position} A promise that resolves to the current position.
 */
const fetchGeo = createAsyncThunk<Position, void, { rejectValue: string }>(
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
  loading: boolean;
  error: string | undefined;
}

const initialState: GeoState = {
  position: undefined,
  loading: false,
  error: undefined,
};

export const geo = createSlice({
  name: "geo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGeo.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchGeo.fulfilled, (state, action) => {
      const { lat, lon } = action.payload;

      Object.assign(state, {
        loading: false,
        position: { lat, lon },
        error: undefined,
      });
    });

    builder.addCase(fetchGeo.rejected, (state, action) => {
      Object.assign(state, {
        loading: false,
        error: action.payload,
      });
    });
  },
});

export const Geo = {
  fetch: fetchGeo,
  selectPosition: (state: State) => state.geo.position,
};
