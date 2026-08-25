console.log("Presentación con fondo galaxia y navbar dinámica 🚀");


let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");


window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos < currentScrollPos) {
    // Bajando → esconder navbar
    navbar.style.top = "-70px";
  } else {
    // Subiendo → mostrar navbar
    navbar.style.top = "0";
  }
  prevScrollPos = currentScrollPos;
};
