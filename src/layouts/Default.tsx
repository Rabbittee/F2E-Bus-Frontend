import clsx from "clsx";
import { ReactNode, useEffect } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import { cond, T } from "ramda";

import {
  Background,
  HasBack,
  Map,
  Stations,
  Icon,
  PageTabs,
} from "@/components";
import { API, Params, SearchParams, useHash } from "@/logic";
import { Home } from "./Home";
import { latLng, latLngBounds } from "leaflet";
import { Polygon } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { URLSearchParams } from "@/utils";
import { Station } from "@/models";

const match =
  (...patterns: string[]) =>
  (pathname: string) =>
    patterns.some((pattern) => matchPath(pattern, pathname));

export function Default() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = SearchParams.useQuery();

  const matchPath = (...pattern: string[]) =>
    match(...pattern)(location.pathname);

  const { data: locations } = API.useGetRecommendQueryQuery(
    {
      query: query!,
      use_geocode_api: true,
      with_bounding_center: true,
    },
    { skip: !query || !matchPath("/locations") }
  );

  const isNearby = locations?.stations.some(({ name }) => name === query);
  const toLocation = (station: Station) => ({
    pathname: isNearby ? `/stations/${String(station.id)}` : undefined,
    search: URLSearchParams({ query: station.name }),
  });

  const id = Params.useID();
  const { data: station } = API.useGetStationInformationQuery(id!, {
    skip: !id || !matchPath("/stations/:id"),
  });

  const { data: nearby } = API.useGetRecommendQueryQuery(
    {
      use_geocode_api: true,
      location: station?.position,
    },
    {
      skip: !station?.position || !matchPath("/stations/:id"),
      selectFromResult: ({ data }) => ({
        data: data?.stations.filter((nearby) => nearby.id !== id),
      }),
    }
  );

  const { data: route } = API.useGetRouteInformationQuery(id!, {
    skip: !id || !matchPath("/routes/:id/*"),
  });

  const direction = SearchParams.useDirection();

  const { data: stops } = API.useGetRouteStopsQuery(
    { id: id!, direction },
    { skip: !id || !matchPath("/routes/:id/*") }
  );

  const points = stops && stops.map(({ position }) => latLng(position));
  const bounds = points && latLngBounds(points);

  const hash = useHash();
  const focus = stops && stops.find(({ id }) => id === hash)?.position;
  useEffect(() => focus && scroll({ top: 0 }), [focus]);

  return (
    <main
      className={clsx(
        "flex flex-col gap-2 container mx-auto py-8",
        matchPath("/") ? "lg:items-center" : "lg:flex-row"
      )}
    >
      <Background.Map />

      <header
        className={clsx("flex flex-col gap-6", "lg:w-2/3 lg:max-w-[72vw]")}
      >
        {cond<string, ReactNode>([
          [match("/"), () => <Home />],
          [
            match("/locations"),
            () => <HasBack className="text-dark-green" title={query} />,
          ],
          [
            match("/stations/:id"),
            () => <HasBack className="text-dark-green" title={station?.name} />,
          ],
          [
            match("/routes/:id/*"),
            () => <HasBack className="text-orange" title={route?.name} />,
          ],
          [T, () => <></>],
        ])(location.pathname)}

        {matchPath("routes/:id/*") && (
          <PageTabs
            items={[
              {
                id: "1",
                name: "公車路線",
                icon: <Icon.Route className="w-9" />,
                to: { pathname: `/routes/${id}` },
                active: matchPath("/routes/:id"),
              },
              {
                id: "2",
                name: "公車地圖",
                icon: <Icon.Map className="w-10" />,
                to: { pathname: `/routes/${id}/map` },
                active: matchPath("/routes/:id/map"),
              },
              {
                id: "3",
                name: "公車資訊",
                icon: <Icon.Info className="w-8" />,
                to: { pathname: `/routes/${id}/info` },
                active: matchPath("/routes/:id/info"),
              },
            ]}
          />
        )}

        {matchPath("/locations") && (
          <Map
            className={clsx(
              "w-full h-[32vh] px-2 my-2",
              "sm:h-[64vh]",
              "lg:h-[84vh]"
            )}
            bounds={
              locations &&
              latLngBounds(locations.stations.map(({ position }) => position))
            }
            zoom={18}
          >
            <Stations
              stops={locations?.stations}
              icon={Icon.Leaflet.Location}
              onClick={(station) => navigate(toLocation(station as Station))}
            />
          </Map>
        )}

        {matchPath("/stations/:id") && (
          <Map
            className={clsx(
              "w-full h-[32vh] px-2 my-2",
              "sm:h-[64vh]",
              "lg:h-[84vh]"
            )}
            center={station?.position}
            zoom={18}
          >
            <Stations
              stops={station && [station]}
              icon={Icon.Leaflet.LocationActive}
            />

            <Stations stops={nearby} icon={Icon.Leaflet.Location} />
          </Map>
        )}

        {matchPath("/routes/:id/map") && (
          <Map
            className={clsx(
              "w-full h-[32vh] px-2 my-2",
              "sm:h-[64vh]",
              "lg:h-[84vh]"
            )}
            {...(focus ? { center: focus, zoom: 18 } : { bounds })}
          >
            <Stations
              stops={stops}
              icon={Icon.Leaflet.Location}
              onClick={(station) =>
                document.getElementById(String(station.id))?.scrollIntoView()
              }
            />

            {points && <Polygon positions={points} />}
          </Map>
        )}
      </header>

      <div className="lg:w-1/3">
        <Outlet />
      </div>
    </main>
  );
}
