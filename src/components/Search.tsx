import { useHistory } from "react-router";
import clsx from "clsx";

export function Search() {
  const history = useHistory<string>();
  return (
    <button
      className={clsx("bg-cyan-dark text-white rounded-full ", "py-2.5")}
      type="button"
      onClick={() => history.push("/result")}
    >
      搜尋
    </button>
  );
}
