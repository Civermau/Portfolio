// Extracted from index.html

// --- Navbar Script --- //
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

function setupNavbar() {
  const e = document.querySelector(".navbar-burger");
  e && e.addEventListener("click", o),
    document.addEventListener("click", a),
    i(),
    c(),
    window.addEventListener("scroll", c);

  // Call the highlight function
  highlightActiveNavItem();
}
function cleanupNavbar() {
  const e = document.querySelector(".navbar-burger");
  e && e.removeEventListener("click", o),
    document.removeEventListener("click", a),
    window.removeEventListener("scroll", c);
}

// --- Particles Script --- //
class Particle {
  x;
  y;
  size;
  speedX;
  speedY;
  color;
  constructor(canvas, colors) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update(canvas) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.y > canvas.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = canvas.height;
    }
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const colors = (
      canvas.dataset.colors || "#6366f1,#8b5cf6,#d946ef,#ec4899"
    ).split(",");
  const particleCount = parseInt(canvas.dataset.count || "50");
  const connectParticles = canvas.dataset.connect === "true";
  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  const particles = [];
  for (let i = 0; i < particleCount; i++) particles.push(new Particle(canvas, colors));
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particles) particle.update(canvas), particle.draw(ctx);
    if (connectParticles) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// --- Typewriter Script --- //
(function () {
  const texts = ["This is Civer_mau"];
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const loop = true;
  const id = "home-typewriter";

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

  // Initial run for the specific typewriter on first load
  initTypewriter(id);
})();

// --- Smooth Scrolling Script --- //
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = anchor.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// --- Random Repo Fetch Script --- //
const defaultRepoData = {
  title: "Random Project",
  description:
    "Unable to load project data. Please check out all my projects instead!",
  image: document.getElementById("random-repo-image")?.src || "",
  tags: ["Error loading tags"],
  link: "/projects",
};
async function fetchRandomRepoData() {
  try {
    const reposResponse = await fetch("https://api.github.com/users/Civermau/repos");
    if (!reposResponse.ok) throw new Error(`GitHub API error: ${reposResponse.status}`);
    const repos = await reposResponse.json();
    if (!repos || repos.length === 0) throw new Error("No repositories found");
    const randomRepo = repos[Math.floor(Math.random() * repos.length)];
    console.log("Selected repository:", randomRepo.name);
    const languagesResponse = await fetch(
        `https://api.github.com/repos/Civermau/${randomRepo.name}/languages`
      );
    const languages = languagesResponse.ok ? Object.keys(await languagesResponse.json()) : [];
    const imageUrl = `https://raw.githubusercontent.com/Civermau/${randomRepo.name}/master/Cover.png`;
    console.log("Attempting to fetch image from:", imageUrl);
    const imageResponse = await fetch(imageUrl);
    console.log("Image response status:", imageResponse.status);
    let finalImageUrl = document.getElementById("random-repo-image")?.src || "";
    if (imageResponse.ok) {
      finalImageUrl = imageUrl;
      console.log("Image loaded successfully");
    } else {
      console.log("Failed to load image, using placeholder");
    }
    return {
      title: randomRepo.name,
      description: randomRepo.description || "No description available",
      image: finalImageUrl,
      tags: languages.length > 0 ? languages : ["No languages detected"],
      link: "/projects",
    };
  } catch (error) {
    console.error("Error fetching random repo:", error);
    return defaultRepoData;
  }
}
async function updateRandomRepoSection() {
  try {
    const repoData = await fetchRandomRepoData();
    const imageElement = document.getElementById("random-repo-image");
    if (imageElement) {
      const tempImage = new Image();
      tempImage.onload = () => {
        imageElement.src = repoData.image;
      };
      tempImage.src = repoData.image;
    }
    const titleElement = document.getElementById("random-repo-title");
    if (titleElement) {
      titleElement.innerText = repoData.title;
    }
    const titleMainElement = document.getElementById("random-repo-title-main");
    if (titleMainElement) {
      titleMainElement.innerText = repoData.title;
    }
    const descriptionElement = document.getElementById("random-repo-description");
    if (descriptionElement) {
      descriptionElement.innerText = repoData.description;
    }
    const tagsElement = document.getElementById("random-repo-tags");
    if (tagsElement) {
      tagsElement.innerHTML = "";
      repoData.tags.forEach((tag) => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "badge is-primary"; // Using the same class as before
        tagSpan.innerText = tag;
        tagsElement.appendChild(tagSpan);
      });
    }
  } catch (error) {
    console.error("Error updating random repo section:", error);
  }
}

// --- Event Listeners Setup --- //
function runPageScripts() {
  setupNavbar();
  initParticles();
  // Typewriter is IIFE, runs itself
  // Smooth scrolling runs on DOMContentLoaded
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    updateRandomRepoSection();
  }
}

function cleanupPageScripts() {
  cleanupNavbar();
  // Need to find a way to cleanup particles if necessary
  // Typewriter cleans itself up via astro:before-preparation
}

document.addEventListener("DOMContentLoaded", runPageScripts);
document.addEventListener("astro:page-load", runPageScripts);
document.addEventListener("astro:before-preparation", cleanupPageScripts); 