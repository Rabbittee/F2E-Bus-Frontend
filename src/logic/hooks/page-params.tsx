import { useParams } from "react-router-dom";

export namespace Params {
  export function useID() {
    return useParams<"id">()["id"];
  }
}
