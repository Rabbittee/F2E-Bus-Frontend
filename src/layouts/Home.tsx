import { FormEvent, ChangeEvent } from "react";
import { has } from "ramda";
import { useNavigate } from "react-router-dom";

import { Input, Button } from "@/components";
import { API, Query, useDispatch, useSelector } from "@/logic";
import { pickRandomIn, URLSearchParams } from "@/utils";
import logo from "@/assets/images/logo.png";
import TITLE from "@/assets/title.json";

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
        if (data.routes.length === 1) {
          const [route] = data.routes;

          return navigate({
            pathname: `routes/${String(route.id)}`,
            search: URLSearchParams({ query }),
          });
        }

        if (data.stations.length) {
          return navigate({
            pathname: `locations`,
            search: URLSearchParams({ query }),
          });
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
    <div className="px-7 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-8 pt-4">
        <img className="md:max-w-xl" src={logo} alt="LOGO" />
      </div>

      <form
        className="flex flex-col w-full gap-4 bg-white"
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

        <Button disabled={!query}>搜尋</Button>
      </form>
    </div>
  );
}
