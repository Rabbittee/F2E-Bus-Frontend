import { useMemo } from "react";
import { useParams } from "react-router-dom";
import invariant from "tiny-invariant";

export namespace Params {
  export function useID() {
    const { id } = useParams<"id">();
    invariant(id, "page param id should not be empty.");

    return id;
  }
}
