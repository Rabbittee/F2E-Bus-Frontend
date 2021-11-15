import { useSearchParams, Navigate } from "react-router-dom";

import { Query, useSelector } from "@/logic";
import { HasBack } from "./HasBack";

export function Location() {
  const [param] = useSearchParams({
    query: useSelector(Query.selectQuery),
  });

  const query = param.get("query");

  if (!query) {
    return <Navigate to="/" replace />;
  }

  return <HasBack title={query} />;
}
