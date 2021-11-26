import { FormEvent, ChangeEvent } from "react";
import { has } from "ramda";
import { useNavigate } from "react-router-dom";

import { Input, Button } from "@/components";
import { API, Query, useDispatch, useSelector } from "@/logic";
import { pickRandomIn, URLSearchParams } from "@/utils";
import logo from "@/assets/images/logo.png";
import logoWb from "@/assets/svgs/home-logo.svg";
import TITLE from "@/assets/title.json";
import { ToastProvider } from "@/components";

const title = pickRandomIn(TITLE);

export function Home() {
  const query = useSelector(Query.selectQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(Query.update(event.target.value));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(
      API.endpoints.getRecommendQuery.initiate({
        query,
        use_geocode_api: true,
        with_bounding_center: true,
      })
    )
      .then(({ data }) => {
        if (!data) {
          return Promise.reject(new Error("API GetRecommendQuery return null"));
        }

        if (!has("center", data) || !has("bbox", data)) {
          return Promise.reject(
            new Error("API GetRecommendQuery response unexpected")
          );
        }

        return data;
      })
      .then((data) => {
        if (
          data.routes.length === 1 ||
          data.routes.some((route) => route.name === query)
        ) {
          const route = data.routes.find((route) => route.name === query);

          route && dispatch(Query.record(route));

          return navigate({
            pathname: `routes/${String(route?.id)}`,
            search: URLSearchParams({ query }),
          });
        }

        if (
          data.stations.length === 1 ||
          data.stations.some((station) => station.name === query)
        ) {
          const station = data.stations.find(
            (station) => station.name === query
          );

          station && dispatch(Query.record(station));

          return navigate({
            pathname: `stations/${String(station?.id)}`,
          });
        }

        if (data.stations.length > 1) {
          dispatch(Query.record(query));

          return navigate({
            pathname: `locations`,
            search: URLSearchParams({ query }),
          });
        }

        if (data.routes.length > 1) {
          return;
        }

        return navigate({
          pathname: `notfound`,
          search: URLSearchParams({ query }),
        });
      })
      .catch(console.error);
  }

  function onReset() {
    dispatch(Query.update(""));
  }

  return (
    <ToastProvider>
      <div className="px-7 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-8 pt-4">
          <img className="md:max-w-xl xl:hidden" src={logo} alt="LOGO" />
          <img
            className="md:max-w-xl w-[560px] xl:block hidden"
            src={logoWb}
            alt="LOGO"
          />
        </div>

        <form
          className="flex flex-col w-full gap-4 bg-white max-w-xl mx-auto"
          onSubmit={onSubmit}
          onResetCapture={onReset}
        >
          <h2
            className="text-3xl text-center font-bold text-dark-green"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <Input
            name="query"
            placeholder="搜尋相關的 公車、站牌或是地標..."
            value={query}
            onChange={onChange}
          />

          <Button variant="dark-green-contained" disabled={!query}>
            <button>搜尋</button>
          </Button>
        </form>
      </div>
    </ToastProvider>
  );
}
