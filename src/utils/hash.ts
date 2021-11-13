export function hash(msg: string) {
  let hash = 0;

  if (msg.length == 0) {
    return hash;
  }

  for (let i = 0; i < msg.length; i++) {
    const char = msg.charCodeAt(i);

    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}
