import { PropsWithChildren } from "react";
import { Loading } from "@/components";
import { useThrottle } from "@/utils";
import { System, useSelector } from "..";
import { cond, startsWith, T } from "ramda";

const ThrottleTime = 2000;

export function SystemProvider({ children }: PropsWithChildren<{}>) {
  const loading = useThrottle(useSelector(System.selectLoading), ThrottleTime);
  const currentAction = useThrottle(
    useSelector(System.selectCurrentAction),
    ThrottleTime
  );

  return (
    <>
      {children}

      {loading && (
        <Loading>
          {cond<string, string | undefined>([
            [startsWith("geo"), () => "正在定位中"],
            [startsWith("api"), () => "正在查詢中"],
            [T, () => undefined],
          ])(currentAction || "")}
        </Loading>
      )}
    </>
  );
}
