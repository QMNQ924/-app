const deck = document.getElementById("deck");
const slides = Array.from(document.querySelectorAll(".slide"));
const navButtons = Array.from(document.querySelectorAll(".slide-nav button"));
const progressBar = document.getElementById("progressBar");
const currentPage = document.getElementById("currentPage");
const sectionName = document.getElementById("sectionName");

let current = 0;
let locked = false;
let touchStartY = 0;
let touchStartX = 0;
const leaveTimers = new WeakMap();

function clampIndex(index) {
  return Math.max(0, Math.min(slides.length - 1, index));
}

function showSlide(index) {
  const next = clampIndex(index);
  if (next === current) return;
  const previous = current;
  const previousSlide = slides[previous];
  const oldTimer = leaveTimers.get(previousSlide);
  if (oldTimer) window.clearTimeout(oldTimer);

  previousSlide.classList.add("is-leaving");
  previousSlide.classList.remove("active");
  navButtons[previous].classList.remove("active");

  const timer = window.setTimeout(() => {
    previousSlide.classList.remove("is-leaving");
    previousSlide.setAttribute("aria-hidden", "true");
    leaveTimers.delete(previousSlide);
  }, 240);
  leaveTimers.set(previousSlide, timer);

  current = next;
  const nextSlide = slides[current];
  const nextTimer = leaveTimers.get(nextSlide);
  if (nextTimer) {
    window.clearTimeout(nextTimer);
    leaveTimers.delete(nextSlide);
  }
  nextSlide.classList.remove("is-leaving");
  slides[current].classList.add("active");
  navButtons[current].classList.add("active");
  slides[current].setAttribute("aria-hidden", "false");

  const page = String(current + 1).padStart(2, "0");
  currentPage.textContent = page;
  sectionName.textContent = slides[current].dataset.section || "Deck";
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  history.replaceState(null, "", `#${page}`);
}

function nextSlide() {
  showSlide(current + 1);
}

function prevSlide() {
  showSlide(current - 1);
}

function lockNavigation() {
  locked = true;
  window.setTimeout(() => {
    locked = false;
  }, 620);
}

deck.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.closest("button, a")) return;
  nextSlide();
});

window.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    if (locked || Math.abs(event.deltaY) < 18) return;
    event.deltaY > 0 ? nextSlide() : prevSlide();
    lockNavigation();
  },
  { passive: false }
);

window.addEventListener("keydown", (event) => {
  if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    nextSlide();
  }
  if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(event.key)) {
    event.preventDefault();
    prevSlide();
  }
  if (event.key === "Home") {
    event.preventDefault();
    showSlide(0);
  }
  if (event.key === "End") {
    event.preventDefault();
    showSlide(slides.length - 1);
  }
});

window.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.touches[0];
    touchStartY = touch.clientY;
    touchStartX = touch.clientX;
  },
  { passive: true }
);

window.addEventListener(
  "touchend",
  (event) => {
    const touch = event.changedTouches[0];
    const dy = touch.clientY - touchStartY;
    const dx = touch.clientX - touchStartX;
    if (Math.max(Math.abs(dy), Math.abs(dx)) < 48) return;
    if (Math.abs(dy) >= Math.abs(dx)) {
      dy < 0 ? nextSlide() : prevSlide();
    } else {
      dx < 0 ? nextSlide() : prevSlide();
    }
  },
  { passive: true }
);

navButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    showSlide(index);
  });
});

window.addEventListener("load", () => {
  document.querySelectorAll("img").forEach((image) => {
    image.decoding = "async";
    image.draggable = false;
    if (typeof image.decode === "function") {
      image.decode().catch(() => {});
    }
  });
});

slides.forEach((slide, index) => {
  slide.setAttribute("aria-hidden", index === current ? "false" : "true");
});

const hashIndex = Number.parseInt(window.location.hash.replace("#", ""), 10);
if (Number.isFinite(hashIndex) && hashIndex >= 1 && hashIndex <= slides.length) {
  current = 0;
  showSlide(hashIndex - 1);
} else {
  progressBar.style.width = `${(1 / slides.length) * 100}%`;
}
