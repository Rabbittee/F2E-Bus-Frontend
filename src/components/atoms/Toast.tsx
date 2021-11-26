import { createContext, useContext } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Icon } from "./Icon";

export function Toast() {
  const noticeElement: HTMLElement | null = document.getElementById("notice");
  return noticeElement
    ? createPortal(
        <div
          className={clsx(
            "relative",
            "flex items-center justify-between py-2.5 px-6 rounded-xl",
            " bg-orange m-0.5 text-white opacity-90",
            " w-80 md:w-auto",
            "transition-all duration-100 animate-moveDown"
          )}
        >
          <span className="w-8">
            {" "}
            <Icon.Alert />{" "}
          </span>
          <p>無法定位使用者位置... </p>
          <button className="w-8">
            <Icon.Close />
          </button>
        </div>,
        noticeElement
      )
    : null;
}

type Message = {
  id: string;
  message: string;
};

type SetMessageAction = (msg: Message[]) => void;

const Context = createContext<SetMessageAction | undefined>(undefined);

export function useToast() {
  const context = useContext(Context);

  if (!context) throw new Error("useToast should be use within ToastProvider");

  return context;
}
