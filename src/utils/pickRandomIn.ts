export function pickRandomIn<T>(list: T[]) {
  const index = Math.floor(Math.random() * list.length);

  return list[index];
}
