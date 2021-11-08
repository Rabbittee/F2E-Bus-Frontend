import { PropsWithChildren, useEffect } from "react";
import { useDispatch, Geo } from "@/logic";

export function GeoProvider({ children }: PropsWithChildren<{}>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Geo.fetch());
  }, []);

  return <>{children}</>;
}
