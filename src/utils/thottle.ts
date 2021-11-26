import { useEffect, useState, useRef } from "react";

export function useThrottle<T>(value: T, ms = 200) {
  const [state, setState] = useState<T>(value);

  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextValue = useRef<T>(state);
  const hasNextValue = useRef(false);

  useEffect(() => {
    if (timeout.current) {
      nextValue.current = value;
      hasNextValue.current = true;

      return;
    }

    setState(value);

    function callback() {
      if (!hasNextValue.current) {
        timeout.current = undefined;
        return;
      }

      setState(nextValue.current);
      hasNextValue.current = false;

      timeout.current = setTimeout(callback, ms);
    }
    timeout.current = setTimeout(callback, ms);
  }, [value]);

  return state;
}
