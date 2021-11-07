import { FormEvent, ChangeEvent } from "react";
import { Input } from "@/components";
import logo from "@/images/logo.png";
import { Query, useDispatch } from "@/logic";

import { Button } from "./Button";

export function Home() {
  const dispatch = useDispatch();

  function onChange(event: ChangeEvent<HTMLFormElement>) {
    const formdata = new FormData(event.currentTarget);

    dispatch(Query.update(formdata.get("query")));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submit");
  }

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <img src={logo} alt="LOGO" />

        <h2 className="text-3xl font-bold text-cyan-dark">
          今天想去哪裡冒險呢？
        </h2>
      </div>

      <form
        className="flex flex-col w-full gap-4 bg-white"
        onChangeCapture={onChange}
        onSubmit={onSubmit}
      >
        <Input name="query" placeholder="搜尋相關的 公車、站牌或是地標..." />

        <Button className="py-2.5">搜尋</Button>
      </form>
    </>
  );
}
