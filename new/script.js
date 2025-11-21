/* -----------------------------
   CUSTOM CURSOR FOLLOW
--------------------------------*/
const miniCircle = document.getElementById("minicircle");
let mouseX = 0, mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  gsap.to(miniCircle, {
    x: mouseX,
    y: mouseY,
    duration: 0.25,
    ease: "expo.out"
  });
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* -----------------------------
   ON LOAD — HERO TEXT ANIMATION
--------------------------------*/
gsap.set(".boundingtext", { y: "100%" });

gsap.to(".boundingtext", {
  y: 0,
  duration: 1.2,
  ease: "expo.out",
  stagger: 0.12,
  delay: 0.3
});

gsap.from("#nav a", {
  opacity: 0,
  y: -20,
  duration: 1,
  ease: "expo.out",
  stagger: 0.1,
  delay: 0.6
});

gsap.from("#herofooter a", {
  opacity: 0,
  y: 20,
  duration: 1,
  ease: "expo.out",
  stagger: 0.1,
  delay: 0.8
});

/* -----------------------------
   WORK LIST HOVER EFFECT
--------------------------------*/
document.querySelectorAll(".elem").forEach((elem) => {
  const img = elem.querySelector("img");

  elem.addEventListener("mousemove", (e) => {
    gsap.to(img, {
      opacity: 0.12,
      x: e.clientX - elem.getBoundingClientRect().left - img.width / 2,
      y: e.clientY - elem.getBoundingClientRect().top - img.height / 2,
      scale: 1.05,
      duration: 0.3,
      ease: "power3.out"
    });
  });

  elem.addEventListener("mouseleave", () => {
    gsap.to(img, {
      opacity: 0,
      scale: 1,
      duration: 0.3
    });
  });
});

/* -----------------------------
   SCROLL ANIMATIONS
--------------------------------*/
const fadeItems = document.querySelectorAll(".elem, .about, .subscribe, .footer");

fadeItems.forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    y: 60,
    duration: 1.1,
    ease: "expo.out",
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse",
    }
  });
});

/* -----------------------------
   ABOUT SECTION IMAGE PARALLAX
--------------------------------*/
gsap.to(".about img", {
  y: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".about",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
