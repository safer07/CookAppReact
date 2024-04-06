export default function debounce(func: Function, ms: number) {
  let timeout: number;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
