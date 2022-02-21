window.addEventListener("load", () => {
  console.log("load");
  const script = document.createElement("SCRIPT");
  script.src = "./js/home/home.js";
  script.setAttribute("type", "module");
  document.querySelector("body").appendChild(script);
});