console.log("Presentación con fondo galaxia y navbar dinámica 🚀");


let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");


window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos < currentScrollPos) {
    navbar.classList.add("is-hidden");
  } else {
    navbar.classList.remove("is-hidden");
  }
  prevScrollPos = currentScrollPos;
};

const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section[id]");
const pageProgress = document.getElementById("page-progress");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetSection = document.querySelector(link.getAttribute("href"));
    if (!targetSection) return;

    event.preventDefault();
    navbar.classList.remove("is-hidden");
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth"
    });
  });
});

function updatePageProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  pageProgress.value = progress;
}

window.addEventListener("scroll", updatePageProgress, { passive: true });
window.addEventListener("resize", updatePageProgress);
pageProgress.addEventListener("input", () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({ top: (pageProgress.value / 100) * scrollableHeight, behavior: "smooth" });
});
updatePageProgress();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach((section) => sectionObserver.observe(section));

const downloadToggle = document.getElementById("download-toggle");
const downloadMenu = document.getElementById("download-menu");

downloadToggle.addEventListener("click", () => {
  const isOpen = downloadToggle.getAttribute("aria-expanded") === "true";
  downloadToggle.setAttribute("aria-expanded", String(!isOpen));
  downloadMenu.hidden = isOpen;
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".download-widget")) {
    downloadToggle.setAttribute("aria-expanded", "false");
    downloadMenu.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    downloadToggle.setAttribute("aria-expanded", "false");
    downloadMenu.hidden = true;
  }
});
