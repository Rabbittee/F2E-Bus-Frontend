import { Input } from "@/components";
import logo from "@/images/logo.png";

import { Button } from "./Button";

export function Home() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
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

      <form className="flex flex-col w-full gap-4 bg-white" onSubmit={onSubmit}>
        <Input />

        <Button className="py-2.5">搜尋</Button>
      </form>
    </>
  );
}
