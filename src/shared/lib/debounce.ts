// TODO: этот файл не используется

export function debounce(value: string, ms: number) {
  let timeout: ReturnType<typeof setTimeout>
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => value, ms)
  }
}

// export function debounce(func: Function, ms: number) {
//   let timeout: ReturnType<typeof setTimeout>
//   return function (this: any, ...args: any[]) {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => func.apply(this, args), ms)
//   }
// }

// const debounce = (fn, delay) => {
//   let timerId;
//   return (...args) => {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => fn(...args), delay);
//   }
// };
