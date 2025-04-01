function o() {
  const e = document.querySelector(".navbar-burger"),
    n = document.querySelector("#navbarMenu");
  e &&
    n &&
    (e.classList.toggle("is-active"), n.classList.toggle("is-active"));
}

function a(e) {
  const n = document.querySelector(".navbar-burger"),
    t = document.querySelector("#navbarMenu"),
    r = e.target;
  t &&
    t.classList.contains("is-active") &&
    n &&
    !r.closest(".navbar-burger") &&
    !r.closest(".navbar-menu") &&
    (n.classList.remove("is-active"), t.classList.remove("is-active"));
}

function i() {
  const e = document.querySelectorAll(".navbar-start .navbar-item"),
    n = document.querySelector(".navbar-burger"),
    t = document.querySelector("#navbarMenu");
  n &&
    t &&
    e.forEach((r) => {
      r.addEventListener("click", () => {
        window.innerWidth < 1024 &&
          (n.classList.remove("is-active"),
          t.classList.remove("is-active"));
      });
    });
}

function c() {
  const e = document.querySelector(".navbar");
  if (e) {
    const n = window.scrollY > 10;
    e.classList.toggle("is-scrolled", n);
  }
}

// Function to highlight active navbar item
function highlightActiveNavItem() {
  const currentPath = window.location.pathname;
  
  // Don't highlight any item on the about-webpage page
  if (currentPath.includes("/about-webpage")) {
    return;
  }
  
  const navItems = document.querySelectorAll(".navbar-start .navbar-item");
  
  // Remove active class from all items
  navItems.forEach(item => {
    item.classList.remove("is-active");
  });
  
  // Add active class to matching item
  navItems.forEach(item => {
    const href = item.getAttribute("href");
    if (href === "/" && (currentPath === "/" || currentPath === "/index.html")) {
      item.classList.add("is-active");
    } else if (currentPath.startsWith(href) && href !== "/") {
      item.classList.add("is-active");
    }
  });
}

function s() {
  const e = document.querySelector(".navbar-burger");
  e && e.addEventListener("click", o),
    document.addEventListener("click", a),
    i(),
    c(),
    window.addEventListener("scroll", c);
    
  // Call the highlight function
  highlightActiveNavItem();
}

function u() {
  const e = document.querySelector(".navbar-burger");
  e && e.removeEventListener("click", o),
    document.removeEventListener("click", a),
    window.removeEventListener("scroll", c);
}

document.addEventListener("DOMContentLoaded", s);
document.addEventListener("astro:page-load", s);
document.addEventListener("astro:before-preparation", u); 