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

type ToastProps = {
  type: string;
};

export function Toast({ type }: ToastProps) {
  const noticeElement: HTMLElement | null = document.getElementById("notice");
  return noticeElement
    ? createPortal(
        <div
          className={clsx(
            "relative",
            "flex items-center gap-4 py-2 px-4 rounded  border-2",
            "w-full md:w-auto",
            "transition-all duration-100 animate-moveDown",
            type === "success" && "bg-white border-green text-green"
          )}
        >
          <span className="w-8"> {type === "success" && <Icon.Success />}</span>
          <p>URL is copied!!</p>
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
        <Toast type="success" key={id} />
      ))}
    </Context.Provider>
  );
}

export function useToast() {
  const context = useContext(Context);

  if (!context) throw new Error("useToast should be use within ToastProvider");

  return context;
}
