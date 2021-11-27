import { PropsWithChildren } from "react";
import { Loading, Toast } from "@/components";
import { useThrottle } from "@/utils";
import { System, useDispatch, useSelector } from "..";
import { matchPath } from "react-router-dom";
import { cond, equals, T } from "ramda";

const ThrottleTime = 3000;

export function SystemProvider({ children }: PropsWithChildren<{}>) {
  const dispatch = useDispatch();
  const loading = useThrottle(useSelector(System.selectLoading), ThrottleTime);
  const currentAction = useThrottle(
    useSelector(System.selectCurrentAction),
    ThrottleTime
  );

  const error = useSelector(System.selectError);

  const isHomePage = matchPath("/", window.location.pathname);
  const isSearchLoading = currentAction?.startsWith("api");
  const isGeoLoading = currentAction?.startsWith("geo");

  return (
    <>
      {children}

      {error && (
        <Toast
          type="error"
          message={cond<string, string>([
            [equals("RESOURCE_NOT_FOUND"), () => "查無資料...🥲"],
            [T, () => "定位失敗...🥲"],
          ])(error)}
          onClose={() => dispatch(System.error(undefined))}
        />
      )}

      {loading && isGeoLoading && <Loading>正在定位中</Loading>}
      {loading && isHomePage && isSearchLoading && (
        <Loading>正在查詢中</Loading>
      )}
    </>
  );
}
