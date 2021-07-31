const body = document.querySelector("body");
const footer = document.querySelector("footer");
function changefooter() {
  if (body.clientHeight > window.innerHeight && window.innerWidth > 850) {
    footer.style.position = "static";
  } else footer.style.position = "fixed";
}
onload = () => {
  changefooter();
  window.addEventListener("resize", changefooter);
};
