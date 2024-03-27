export default function scrollNoSmooth() {
  const html = document.querySelector("html");
  html.style.scrollBehavior = "auto";
  setTimeout(() => window.scrollTo(0, 0), 1);
  setTimeout(() => (html.style.scrollBehavior = ""), 100);
}
