import { Box, InfoTab } from "@/components";
import { API } from "@/logic";
import { Navigate, useParams } from "react-router";

export function Info() {
  const { id } = useParams<"id">();
  const { data } = API.useGetRouteInformationQuery(id!, { skip: !id });

  if (!id) return <Navigate to="/" replace />;

  if (!data) return <></>;

  return (
    <div className="pt-4 flex flex-1 flex-col gap-4 relative ">
      <Box>
        <InfoTab />

        <ul className="flex flex-col gap-2 overflow-scroll px-2 cyan-scroll w-full ">
          <li id="routeName">
            <div className="rounded-xl flex flex-col shadow m-1">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h3 className="text-2xl font-bold">
                  {data.city} {data.name}
                </h3>
              </div>
              <div className="flex flex-col rounded-b-xl bg-white p-3">
                <h4 className="font-bold text-lg">
                  {data.departure} — {data.destination}
                </h4>
              </div>
            </div>
          </li>
          <li id="payment">
            <div className="rounded-xl flex flex-col shadow m-1">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h3 className="text-2xl font-bold">收費方式</h3>
              </div>
              <div className="flex flex-col gap-6 rounded-b-xl bg-white p-3">
                <h4 className="font-bold text-lg">
                  {data.price.description}，每段15元
                </h4>
                <div className="text-lg">
                  <h4 className="font-bold">分段緩衝區</h4>
                  <p>{data.price.buffer}</p>
                </div>
              </div>
            </div>
          </li>
          <li id="worktimelist">
            <div className="rounded-xl flex flex-col shadow m-1">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h3 className="text-2xl font-bold">平日發車資訊</h3>
              </div>
              <div className="flex flex-col gap-6 rounded-b-xl bg-white p-3">
                <div className="text-lg">
                  <h4 className="font-bold">頭末班車</h4>
                  <p>
                    往{data.subRoutes[0].busTime.first}~
                    {data.subRoutes[0].busTime.last}
                  </p>
                  <p>
                    返{data.subRoutes[1].busTime.first}~
                    {data.subRoutes[1].busTime.last}
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li id="holidaytimelist">
            <div className="rounded-xl flex flex-col shadow m-1">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h3 className="text-2xl font-bold">假日發車資訊</h3>
              </div>
              <div className="flex flex-col gap-6 rounded-b-xl bg-white p-3">
                <div className="text-lg">
                  <h4 className="font-bold">頭末班車</h4>
                  <p>
                    往{data.subRoutes[0].busTime.holidayFirst}~
                    {data.subRoutes[0].busTime.holidayLast}
                  </p>
                  <p>
                    返{data.subRoutes[1].busTime.holidayFirst}~
                    {data.subRoutes[1].busTime.holidayLast}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Box>
    </div>
  );
}
