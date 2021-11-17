import { FormEvent, ChangeEvent } from "react";
import { Input } from "@/components";
import { API, Query, Res, useDispatch, useSelector } from "@/logic";
import { pickRandomIn, URLSearchParams } from "@/utils";
import logo from "@/assets/images/logo.png";

import { Button } from "./Button";
import { has } from "ramda";
import { useNavigate } from "react-router";

const title = pickRandomIn([
  "今天你想去哪冒險呢？",
  "就，很想找公車。",
  "給我公車，其餘免談！",
  "今晚，我想來點...不同路線！",
]);

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

        return data as Required<Res.GetRecommendQuery>;
      })
      .then(({ center }) =>
        navigate({
          pathname: `locations`,
          search: URLSearchParams({
            query,
            ...center,
          }),
        })
      )
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
        <h2 className="text-3xl text-center font-bold text-cyan-dark">
          {title}
        </h2>

        <Input
          name="query"
          placeholder="搜尋相關的 公車、站牌或是地標..."
          value={query}
          onChange={onChange}
        />

        <Button className="py-2 text-lg font-bold tracking-widest">搜尋</Button>
      </form>
    </div>
  );
}
