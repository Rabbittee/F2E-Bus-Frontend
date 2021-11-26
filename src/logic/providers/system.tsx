import { PropsWithChildren } from "react";
import { Loading } from "@/components";
import { useThrottle } from "@/utils";
import { System, useSelector } from "..";
import { matchPath } from "react-router-dom";

const ThrottleTime = 3000;

export function SystemProvider({ children }: PropsWithChildren<{}>) {
  const loading = useThrottle(useSelector(System.selectLoading), ThrottleTime);
  const currentAction = useThrottle(
    useSelector(System.selectCurrentAction),
    ThrottleTime
  );

  const isHomePage = matchPath("/", window.location.pathname);
  const isSearchLoading = isHomePage && currentAction?.startsWith("api");
  const isGeoLoading = currentAction?.startsWith("geo");

  return (
    <>
      {children}

      {loading && isGeoLoading && <Loading>正在定位中</Loading>}
      {loading && isSearchLoading && <Loading>正在查詢中</Loading>}
    </>
  );
}
