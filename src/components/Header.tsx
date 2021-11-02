import { Input, Search, Icon } from "@/components";
import clsx from "clsx";
import { useLocation, useHistory } from "react-router-dom";
import logo from "../images/logo.png";

export function Header() {
  const location = useLocation<string>();
  const history = useHistory<string>();
  const backHome = () => {
    history.push("/");
  };
  return (
    <header
      className={clsx(
        "flex flex-col justify-center items-center",
        "gap-6 pt-12 px-7"
      )}
    >
      {location.pathname === "/" ? (
        <>
          <div className="flex flex-col gap-2 ">
            <img src={logo} alt="" />
            <h2 className="text-3xl font-bold text-cyan-dark">
              今天想去哪裡冒險呢？
            </h2>
          </div>
          <div
            className={clsx(
              "flex flex-col w-full gap-4 rounded-full",
              "bg-white transition-all duration-300"
            )}
          >
            <Input />
            <Search />
          </div>
        </>
      ) : (
        <div className="flex justify-between w-full items-center">
          <button className="text-cyan-dark w-3" onClick={backHome}>
            <Icon.Back />
          </button>
          <h2 className="text-3xl font-bold text-cyan-dark">土城學府路</h2>
          <button className="text-cyan-dark w-6" onClick={backHome}>
            <Icon.Close />
          </button>
        </div>
      )}
    </header>
  );
}
