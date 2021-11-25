import { PropsWithChildren, useEffect } from "react";
import { useDispatch, Geo, useSelector, User } from "@/logic";

export function GeoProvider({ children }: PropsWithChildren<{}>) {
  const enable = useSelector(User.selectEnableGeo);
  const dispatch = useDispatch();

  useEffect(() => {
    enable && dispatch(Geo.fetch());
  }, []);

  return <>{children}</>;
}
