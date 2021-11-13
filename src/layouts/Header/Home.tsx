import { FormEvent, ChangeEvent } from "react";
import { Input } from "@/components";
import logo from "@/assets/images/logo.png";
import { API, Query, useDispatch } from "@/logic";

import { Button } from "./Button";

export function Home() {
  const dispatch = useDispatch();

  function onChange(event: ChangeEvent<HTMLFormElement>) {
    const formdata = new FormData(event.currentTarget);

    dispatch(Query.update(formdata.get("query")));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    const query = formdata.get("query");
    if (!query) return;

    dispatch(API.endpoints.getGeocodeByQuery.initiate(String(query))).then(
      (result) => console.log(result)
    );

    // @TODO: navigate to locations page
  }

  return (
    <div className="px-7 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-8 pt-4">
        <img className="md:max-w-xl" src={logo} alt="LOGO" />
      </div>

      <form
        className="flex flex-col w-full gap-4 bg-white"
        onChangeCapture={onChange}
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl text-center font-bold text-cyan-dark">
          今天想去哪裡冒險呢？
        </h2>

        <Input name="query" placeholder="搜尋相關的 公車、站牌或是地標..." />

        <Button className="py-2 text-lg font-bold tracking-widest">搜尋</Button>
      </form>
    </div>
  );
}
