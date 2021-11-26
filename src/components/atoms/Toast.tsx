import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import { Icon } from "./Icon";

export function Toast() {
  const noticeElement: HTMLElement | null = document.getElementById("notice");
  return noticeElement
    ? createPortal(
        <div
          className={clsx(
            "relative",
            "flex items-center justify-between py-2.5 px-6 rounded-lg",
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

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [messages, setMessages] = useState<
    Array<{ id: string; message: string }>
  >([]);

  const setMessage = useCallback(
    (message) => {
      if (!message) return;

      console.log(message);
      const id = uuid();

      setMessages((queue) => [...queue, { id, message }]);

      setTimeout(() => {
        setMessages((queue) => queue.filter((pair) => pair.id !== id));
      }, 2000);
    },
    [setMessages]
  );

  return (
    <Context.Provider value={setMessage}>
      {children}

      {messages.map(({ id }) => (
        <Toast key={id} />
      ))}
    </Context.Provider>
  );
}

export function useToast() {
  const context = useContext(Context);

  if (!context) throw new Error("useToast should be use within ToastProvider");

  return context;
}
