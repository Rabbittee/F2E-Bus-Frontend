import { Link, useNavigate } from "react-router-dom";
import { Marker } from "react-leaflet";

import { Map, List, Icon, Item } from "@/components";
import { API, SearchParams } from "@/logic";
import { Station } from "@/models";
import { URLSearchParams } from "@/utils";
import { latLngBounds } from "leaflet";

export function Location() {
  const navigate = useNavigate();
  const query = SearchParams.useQuery();
  const center = SearchParams.useGeo();

  const { data } = API.useGetRecommendQueryQuery(
    {
      query: query!,
      use_geocode_api: true,
      with_bounding_center: true,
    },
    { skip: !query }
  );

  const nearby = data?.stations.some(({ name }) => name === query);
  const bounds =
    data?.stations &&
    latLngBounds(data.stations.map(({ position }) => position));

  const toLocation = (station: Station) =>
    nearby
      ? {
          pathname: `/stations/${String(station.id)}`,
          search: URLSearchParams({
            query: station.name,
          }),
        }
      : {
          search: URLSearchParams({
            query: station.name,
            ...station.position,
          }),
        };

  return (
    <div className="flex-1 flex flex-col md:flex-row">
      <Map
        className="w-full md:h-[84vh] md:flex-[8] h-[50vh] px-2 my-2"
        center={center}
        bounds={bounds}
      >
        {data?.stations.map((station) => (
          <Marker
            key={String(station.id)}
            icon={Icon.Leaflet.Location}
            position={station.position}
            eventHandlers={{
              click: () => navigate(toLocation(station)),
            }}
          />
        ))}
      </Map>

      <List
        classes={{
          wrapper:
            "md:px-2 px-8 py-2 text-lg space-y-4 md:flex-[4] text-dark-green",
        }}
        title={
          <strong className="text-2xl">
            {nearby ? "這附近的站牌" : "我可能想查"}
          </strong>
        }
        items={data?.stations}
      >
        {(item) => (
          <Link to={toLocation(item)}>
            <Item.WithIcon icon={<Icon.Search />}>
              <div className="flex flex-col">
                <strong className="text-lg">{item.name}</strong>

                <small className="text-sm text-gray-400">{item.address}</small>
              </div>
            </Item.WithIcon>
          </Link>
        )}
      </List>
    </div>
  );
}
