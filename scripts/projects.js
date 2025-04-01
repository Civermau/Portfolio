// Navbar functionality
function toggleNavbar() {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector("#navbarMenu");
  if (burger && menu) {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  }
}

function handleClickOutside(event) {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector("#navbarMenu");
  const target = event.target;
  if (menu && menu.classList.contains("is-active") && burger && !target.closest(".navbar-burger") && !target.closest(".navbar-menu")) {
    burger.classList.remove("is-active");
    menu.classList.remove("is-active");
  }
}

function setupNavbarItems() {
  const items = document.querySelectorAll(".navbar-start .navbar-item");
  const burger = document.querySelector(".navbar-burger");
  const menu = document.querySelector("#navbarMenu");
  if (burger && menu) {
    items.forEach((item) => {
      item.addEventListener("click", () => {
        if (window.innerWidth < 1024) {
          burger.classList.remove("is-active");
          menu.classList.remove("is-active");
        }
      });
    });
  }
}

function handleScroll() {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const isScrolled = window.scrollY > 10;
    navbar.classList.toggle("is-scrolled", isScrolled);
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

function setupNavbar() {
  const burger = document.querySelector(".navbar-burger");
  burger && burger.addEventListener("click", toggleNavbar);
  document.addEventListener("click", handleClickOutside);
  setupNavbarItems();
  handleScroll();
  window.addEventListener("scroll", handleScroll);
  
  // Call the highlight function
  highlightActiveNavItem();
}

function cleanupNavbar() {
  const burger = document.querySelector(".navbar-burger");
  burger && burger.removeEventListener("click", toggleNavbar);
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("scroll", handleScroll);
}

// Typewriter functionality
(function () {
  const texts = ["Coding Projects"];
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const loop = true;
  const id = "projects-typewriter";

  // Store all typewriter instances in a map
  if (!window.typewriterInstances) {
    window.typewriterInstances = new Map();
  }

  document.addEventListener(
    "astro:page-load",
    () => {
      initTypewriter(id);
    },
    { once: false }
  );

  function initTypewriter(typewriterId) {
    // Clean up existing instance for this specific ID
    cleanupTypewriter(typewriterId);

    // Get the specific typewriter element by ID
    const typewriterElement = document.querySelector(
      `.typewriter-${typewriterId}`
    );
    if (!typewriterElement) return;

    // Create a new instance for this specific ID
    const instance = new Typewriter(
      typewriterElement,
      texts,
      typeSpeed,
      deleteSpeed,
      loop
    );
    window.typewriterInstances.set(
      typewriterId,
      instance
    );
  }

  function cleanupTypewriter(typewriterId) {
    // If no specific ID is provided, clean up all typewriters
    if (!typewriterId) {
      if (window.typewriterInstances) {
        window.typewriterInstances.forEach((instance) =>
          instance.stop()
        );
        window.typewriterInstances.clear();
      }
      return;
    }

    // Clean up the specific typewriter instance
    if (
      window.typewriterInstances &&
      window.typewriterInstances.has(typewriterId)
    ) {
      const instance =
        window.typewriterInstances.get(typewriterId);
      instance.stop();
      window.typewriterInstances.delete(typewriterId);
    }
  }

  // Clean up before page transitions
  document.addEventListener(
    "astro:before-preparation",
    () => {
      // Only clean up this specific typewriter
      cleanupTypewriter(id);
    }
  );

  class Typewriter {
    constructor(
      element,
      words,
      typeSpeed,
      deleteSpeed,
      loop
    ) {
      this.element = element;
      this.words = Array.isArray(words) ? words : [words];
      this.typeSpeed = typeSpeed;
      this.deleteSpeed = deleteSpeed;
      this.loop = loop;
      this.wordIndex = 0;
      this.txt = "";
      this.isDeleting = false;
      this.waitTime = 3000;
      this.stopped = false;
      this.timeout = null;

      // Start typing immediately
      this.type();
    }

    type() {
      if (this.stopped) return;

      const currentWordIndex =
        this.wordIndex % this.words.length;
      const currentWord = this.words[currentWordIndex];

      // Handle typing or deleting
      if (this.isDeleting) {
        this.txt = currentWord.substring(
          0,
          this.txt.length - 1
        );
      } else {
        this.txt = currentWord.substring(
          0,
          this.txt.length + 1
        );
      }

      // Update the element
      this.element.textContent = this.txt;

      // Calculate typing speed
      let typingSpeed = this.isDeleting
        ? this.deleteSpeed
        : this.typeSpeed;

      // Handle completed typing or deletion
      if (!this.isDeleting && this.txt === currentWord) {
        // If there's only one word or loop is disabled, stop here
        if (
          this.words.length === 1 ||
          (!this.loop &&
            this.wordIndex === this.words.length - 1)
        ) {
          return; // Done typing, no deletion needed
        }

        // Wait at the end of the word before deleting
        typingSpeed = this.waitTime;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.wordIndex++;

        // If we've gone through all words and loop is disabled, stop
        if (
          !this.loop &&
          this.wordIndex >= this.words.length
        ) {
          return;
        }

        // Brief pause before starting the next word
        typingSpeed = 500;
      }

      // Schedule the next update
      this.timeout = setTimeout(
        () => this.type(),
        typingSpeed
      );
    }

    stop() {
      this.stopped = true;
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    }
  }

  // Clean up everything when page unloads
  window.addEventListener("beforeunload", () => {
    cleanupTypewriter(); // Clean up all instances
  });
})();

// Initialize navbar on page load
document.addEventListener("DOMContentLoaded", setupNavbar);
document.addEventListener("astro:page-load", setupNavbar);
document.addEventListener("astro:before-preparation", cleanupNavbar);