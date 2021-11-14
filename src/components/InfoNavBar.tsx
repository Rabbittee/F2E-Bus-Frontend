import { Icon } from "@/components";
import clsx from "clsx";
import { useParams } from "react-router";

export function InfoNavBar() {
  const param = useParams();
  const id = param.id;

  return (
    <nav className="w-full relative">
      <ul className="flex justify-between">
        <li
          className={clsx(
            "  flex-1 text-center ",
            location.pathname === `/routes/${id}`
              ? "text-orange border-t rounded-t-xl"
              : " text-cyan-dark border-b",
            location.pathname === `/routes/${id}/map` && "rounded-br-xl"
          )}
        >
          <a href={`/routes/${id}`}>
            <span className="flex flex-col justify-center items-center py-3">
              <Icon.Route className="w-10" />
              <p className="text-base">公車路線</p>
            </span>
          </a>
        </li>
        <li
          className={clsx(
            "flex-1 text-center ",
            location.pathname === `/routes/${id}/map`
              ? "text-orange border-t rounded-xl"
              : "text-cyan-dark border-b",
            location.pathname === `/routes/${id}` && "rounded-bl-xl",
            location.pathname === `/routes/${id}/info` && " rounded-br-xl"
          )}
        >
          <a href={`/routes/${id}/map`}>
            <span className="flex flex-col justify-center items-center py-3">
              <Icon.Map className="w-10" />
              <p className="text-base">公車地圖</p>
            </span>
          </a>
        </li>
        <li
          className={clsx(
            " flex-1 text-center ",
            location.pathname === `/routes/${id}/info`
              ? "border-t rounded-t-xl text-orange"
              : "text-cyan-dark border-b",
            location.pathname === `/routes/${id}/map` && "rounded-bl-xl"
          )}
        >
          <a href={`/routes/${id}/info`}>
            <span className="flex flex-col justify-center items-center py-3">
              <Icon.Info className="w-10" />
              <p className="text-base">公車資訊</p>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
