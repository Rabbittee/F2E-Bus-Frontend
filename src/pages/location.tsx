import { Link } from "react-router-dom";

import { List, Icon, Item } from "@/components";
import { API, SearchParams } from "@/logic";
import { Station } from "@/models";
import { URLSearchParams } from "@/utils";

export function Location() {
  const query = SearchParams.useQuery();

  const { data } = API.useGetRecommendQueryQuery(
    {
      query: query!,
      use_geocode_api: true,
      with_bounding_center: true,
    },
    { skip: !query }
  );

  const nearby = data?.stations.some(({ name }) => name === query);

  const toLocation = (station: Station) => ({
    pathname: nearby ? `/stations/${String(station.id)}` : undefined,
    search: URLSearchParams({ query: station.name }),
  });

  return (
    <List
      classes={{
        wrapper:
          "md:px-2 px-8 py-2 text-lg space-y-4 md:flex-[4] text-dark-green overflow-auto h-full",
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
  );
}
