import { createContext, useCallback, useState, ReactNode } from "react";
import { v4 as uuid } from "uuid";

import { Toast } from "@/components";

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
