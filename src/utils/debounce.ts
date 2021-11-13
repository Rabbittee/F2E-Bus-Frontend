type Fn = (...args: any[]) => any;

export function debounce<T extends Fn>(callback: T, wait = 300) {
  let timer: NodeJS.Timeout | undefined;

  return function (...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(...args), wait);
  };
}
