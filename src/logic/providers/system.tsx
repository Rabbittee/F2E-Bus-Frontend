import { PropsWithChildren } from "react";
import { Loading, Toast } from "@/components";
import { useThrottle } from "@/utils";
import { System, useDispatch, useSelector } from "..";
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
  const isGeoLoading = currentAction?.startsWith("geo");

  return (
    <>
      {children}

      {error && (
        <Toast
          type="error"
          message={cond<string, string>([
            [equals("RESOURCE_NOT_FOUND"), () => "查無資料...🥲"],
            [T, (error) => `${error}...🥲`],
          ])(error)}
          onClose={() => dispatch(System.error(undefined))}
        />
      )}

      {loading && <Loading>正在定位中</Loading>}
    </>
  );
}
