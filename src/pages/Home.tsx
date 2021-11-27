import { Link } from "react-router-dom";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";

import { Icon, List, Item } from "@/components";
import { Query, useDispatch, useRecommendQuery, useSelector } from "@/logic";
import { URLSearchParams } from "@/utils";
import * as Model from "@/models";
import { useEffect } from "react";

type Props = Model.Query & { address?: string };

export function Home() {
  const dispatch = useDispatch();
  const data = useRecommendQuery();
  const history = useSelector(Query.selectQueryHistory);

  const controls = useAnimation();
  const play = () =>
    controls.start({ opacity: [1, 0.5, 1], transition: { duration: 0.35 } });
  useEffect(() => {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", play);

    return () => form.removeEventListener("submit", play);
  }, [play]);

  return (
    <section
      className={clsx(
        "px-8 py-2 w-full md:max-w-xl md:px-0 md:mx-auto",
        "flex flex-col",
        "text-dark-green"
      )}
    >
      <h2 className="text-2xl font-bold pt-4 mb-2">試試這些地方...</h2>

      <div className="space-y-4">
        <List
          title={<small className="text-sm text-orange">最近的搜尋紀錄</small>}
          items={history}
        >
          {({ name, url, address }: Props) => (
            <Link
              to={{ pathname: url, search: URLSearchParams({ query: name }) }}
            >
              <motion.div animate={controls}>
                <Item.WithIcon
                  icon={
                    <div>
                      <Icon.Clock className="w-6 lg:w-8" />
                    </div>
                  }
                >
                  <div className="flex flex-col">
                    <strong className="text-lg">{name}</strong>

                    {address && (
                      <small className="text-sm text-gray-400">{address}</small>
                    )}
                  </div>
                </Item.WithIcon>
              </motion.div>
            </Link>
          )}
        </List>

        <List
          title={<small className="text-sm text-orange">我附近的巴士站</small>}
          items={data?.stations}
        >
          {({ id, name, url, address }: Props) => (
            <Link
              to={{ pathname: url, search: URLSearchParams({ query: name }) }}
              onClick={() => dispatch(Query.record({ id, name, url, address }))}
            >
              <motion.div animate={controls}>
                <Item.WithIcon
                  icon={
                    <div>
                      <Icon.Search className="w-6 lg:w-8" />
                    </div>
                  }
                >
                  <div className="flex flex-col">
                    <strong className="text-lg">{name}</strong>

                    {address && (
                      <small className="text-sm text-gray-400">{address}</small>
                    )}
                  </div>
                </Item.WithIcon>
              </motion.div>
            </Link>
          )}
        </List>

        <List
          title={
            <small className="text-sm text-orange">我附近的巴士路線</small>
          }
          items={data?.routes}
        >
          {({ id, name, url, address }: Props) => (
            <Link
              to={{ pathname: url, search: URLSearchParams({ query: name }) }}
              onClick={() => dispatch(Query.record({ id, name, url, address }))}
            >
              <motion.div animate={controls}>
                <Item.WithIcon
                  icon={
                    <div>
                      <Icon.Search className="w-6 lg:w-8" />
                    </div>
                  }
                >
                  <div className="flex flex-col">
                    <strong className="text-lg">{name}</strong>

                    {address && (
                      <small className="text-sm text-gray-400">{address}</small>
                    )}
                  </div>
                </Item.WithIcon>
              </motion.div>
            </Link>
          )}
        </List>
      </div>
    </section>
  );
}
