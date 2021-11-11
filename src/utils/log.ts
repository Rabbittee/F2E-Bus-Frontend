import { tap } from "ramda";

export const log = <T>(tag: string) => tap<T>((msg) => console.log(tag, msg));
