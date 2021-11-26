import clsx from "clsx";
import { ReactNode, useEffect } from "react";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cond, T, uniqBy } from "ramda";
import { latLng, latLngBounds } from "leaflet";
import { Polyline } from "react-leaflet";

import {
  Background,
  HasBack,
  Map,
  Maps,
  Icon,
  PageTabs,
  ClickToTopButton,
  Geolocation,
} from "@/components";
import { API, Params, SearchParams, useHash } from "@/logic";
import { URLSearchParams } from "@/utils";
import { Station } from "@/models";
import { Home } from "./Home";

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

  const toLocation = (station: Station) => ({
    pathname: `/stations/${String(station.id)}`,
    search: URLSearchParams({ query: station.name }),
  });

  const id = Params.useID();
  const { data: station } = API.useGetStationInformationQuery(id!, {
    skip: !id || !matchPath("/stations/:id"),
  });

  const { data: _nearby } = API.useGetRecommendQueryQuery(
    {
      use_geocode_api: true,
      location: station?.position,
    },
    {
      skip: !station?.position || !matchPath("/stations/:id"),
      selectFromResult: ({ data }) => ({ data: data?.stations }),
    }
  );
  const nearby =
    _nearby &&
    uniqBy(({ tdxID }) => tdxID, _nearby).filter(
      ({ tdxID }) => tdxID !== station?.tdxID
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
    <>
      <main
        className={clsx(
          "flex flex-col gap-2 container mx-auto py-8 lg:max-h-[98vh]",
          matchPath("/") ? "lg:items-center" : "lg:flex-row"
        )}
      >
        {matchPath("/locations", "/stations/:id", "/routes/:id/*") ? (
          <>
            <Background.Map />
            <ClickToTopButton />
          </>
        ) : (
          <Background.Search />
        )}

        <header
          className={clsx(
            "flex flex-col gap-6",
            matchPath(
              "/locations",
              "/stations/:id",
              "/routes/:id",
              "/routes/:id/info"
            ) && "lg:w-2/3 lg:max-w-[72vw]",
            matchPath("/routes/:id/map") && "lg:w-full"
          )}
        >
          {cond<string, ReactNode>([
            [match("/"), () => <Home />],
            [
              match("/locations"),
              () => <HasBack className="text-dark-green" title={query} />,
            ],
            [
              match("/stations/:id"),
              () => (
                <HasBack className="text-dark-green" title={station?.name} />
              ),
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
              {locations?.stations.map((stop, index) => (
                <Maps.Station
                  key={String(stop.id)}
                  stop={stop}
                  icon={Icon.Leaflet.Location}
                  tooltip={({ max, current }) => (
                    <Maps.Tooltip.DarkGreen>
                      <span>{index + 1}</span>

                      {max - current < 2 && <span>{stop.name}</span>}
                    </Maps.Tooltip.DarkGreen>
                  )}
                  onClick={(station) =>
                    navigate(toLocation(station as Station), { replace: true })
                  }
                />
              ))}
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
              {nearby?.map((stop, index) => (
                <Maps.Station
                  key={String(stop.id)}
                  stop={stop}
                  tooltip={({ max, current }) =>
                    max - current < 3 && (
                      <Maps.Tooltip.DarkGreen>
                        {index + 1}
                      </Maps.Tooltip.DarkGreen>
                    )
                  }
                  icon={Icon.Leaflet.Location}
                  onClick={(station) =>
                    navigate(toLocation(station as Station), { replace: true })
                  }
                />
              ))}

              {station && (
                <Maps.Station
                  stop={station}
                  icon={Icon.Leaflet.LocationActive}
                  tooltip={
                    <Maps.Tooltip.Orange>{station.name}</Maps.Tooltip.Orange>
                  }
                />
              )}
            </Map>
          )}

          {matchPath("/routes/:id/*") && (
            <Map
              className={clsx(
                "w-full h-[32vh] px-2 my-2 lg:static",
                "sm:h-[64vh]",
                "lg:h-[84vh]",
                matchPath("/routes/:id/map") || "sr-only"
              )}
              {...(focus ? { center: focus, zoom: 18 } : { bounds })}
            >
              {stops?.map((stop, index) => (
                <Maps.Station
                  key={String(stop.id)}
                  stop={stop}
                  icon={Icon.Leaflet.Location}
                  tooltip={({ max, current }) =>
                    max - current < 5 && (
                      <Maps.Tooltip.DarkGreen>
                        <span>{index + 1}</span>

                        {max - current < 2 && <span>{stop.name}</span>}
                      </Maps.Tooltip.DarkGreen>
                    )
                  }
                  onClick={(station) =>
                    document
                      .getElementById(String(station.id))
                      ?.scrollIntoView()
                  }
                />
              ))}

              {points && (
                <Polyline
                  positions={points}
                  color="currentColor"
                  className="text-blue"
                />
              )}
            </Map>
          )}
        </header>

        <div
          className={clsx(
            matchPath("/locations", "/stations/:id", "/routes/:id/*")
              ? "lg:w-1/3"
              : "w-full",
            matchPath("/routes/:id/map") && "md:hidden block"
          )}
        >
          <Outlet />
        </div>
      </main>

      <Geolocation />
    </>
  );
}
