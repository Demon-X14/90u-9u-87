AOS.init();
setTimeout(() => {
  20000;
});

ScrollReveal().reveal(".reveal", {
  duration: 2000,
  distance: "10px",
  origin: "bottom",
});

window.onload = function () {
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.getElementById("content");

  loadingScreen.style.display = "none";
  content.style.display = "block";
};
