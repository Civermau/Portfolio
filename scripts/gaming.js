// Navbar functionality
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

// Typewriter functionality
class Typewriter {
  constructor(element, texts, typeSpeed, deleteSpeed, loop) {
    this.element = element;
    this.texts = texts;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.loop = loop;
    this.currentTextIndex = 0;
    this.isDeleting = false;
    this.typing = null;
    this.start();
  }
  
  start() {
    this.type();
  }
  
  type() {
    // Get current text
    const currentText = this.texts[this.currentTextIndex];
    
    // Get current text content
    let text = this.element.textContent;
    
    // Set typing speed
    let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
    
    if (this.isDeleting) {
      // Remove character
      text = text.substring(0, text.length - 1);
    } else {
      // Add character
      text = currentText.substring(0, text.length + 1);
    }
    
    // Update element
    this.element.textContent = text;
    
    // If complete word
    if (!this.isDeleting && text === currentText) {
      // Pause at end
      speed = 1000;
      this.isDeleting = true;
    } else if (this.isDeleting && text === '') {
      this.isDeleting = false;
      this.currentTextIndex++;
      
      // If reached end of texts array and loop is true
      if (this.currentTextIndex >= this.texts.length) {
        if (this.loop) {
          this.currentTextIndex = 0;
        } else {
          // End typing
          return;
        }
      }
      
      // Pause before typing new text
      speed = 500;
    }
    
    // Schedule next typing
    const _this = this;
    this.typing = setTimeout(function() {
      _this.type();
    }, speed);
  }
  
  stop() {
    clearTimeout(this.typing);
  }
}

// Define a modified version of the Typewriter that doesn't delete the text
class TypewriterNoDelete extends Typewriter {
  type() {
    // Get current text
    const currentText = this.texts[this.currentTextIndex];
    
    // Get current text content
    let text = this.element.textContent;
    
    // Set typing speed
    let speed = this.typeSpeed;
    
    // Only handle typing, not deleting
    if (!this.isDeleting) {
      // Add character
      text = currentText.substring(0, text.length + 1);
      
      // Update element
      this.element.textContent = text;
      
      // If complete word, stop
      if (text === currentText) {
        return; // Stop typing
      }
    }
    
    // Schedule next typing
    const _this = this;
    this.typing = setTimeout(function() {
      _this.type();
    }, speed);
  }
}

// Initialize typewriter
(function () {
  const texts = ["Gaming"];
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const loop = false;
  const id = "gaming-typewriter";

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
    const instance = new TypewriterNoDelete(
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

  // Clean up everything when page unloads
  window.addEventListener("beforeunload", () => {
    cleanupTypewriter(); // Clean up all instances
  });
})();

// Scroll buttons functionality
function t() {
  document.querySelectorAll(".scrollable-games-wrapper").forEach((e) => {
    const n = e.closest(".scrollable-games-container");
    if (!n) return;
    const o = n.querySelector(".scroll-left"),
      l = n.querySelector(".scroll-right");
    if (e && o && l) {
      const s = () => (window.innerWidth < 768 ? e.clientWidth * 0.85 : 300);
      o.addEventListener("click", () => {
        e.scrollBy({ left: -s(), behavior: "smooth" });
      }),
        l.addEventListener("click", () => {
          e.scrollBy({ left: s(), behavior: "smooth" });
        });
      const c = () => {
        (o.style.display = e.scrollLeft > 20 ? "flex" : "none"),
          (l.style.display =
            e.scrollLeft < e.scrollWidth - e.clientWidth - 20
              ? "flex"
              : "none");
      };
      e.addEventListener("scroll", c), setTimeout(c, 100);
    }
  });
}

function r() {
  window.addEventListener("resize", t);
}

// Steam API Integration
// Configuration
const STEAM_ID = '76561198418838833';
const WORKER_URL = 'https://steam-games-collector.civermau.workers.dev';
const CACHE_DURATION = 60 * 60; // 1 hour cache

// Simple cache implementation
const cache = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const { value, expiry } = JSON.parse(item);
      if (Date.now() > expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return value;
    } catch (e) {
      console.error('Cache error:', e);
      return null;
    }
  },
  set: (key, value, ttl = CACHE_DURATION) => {
    try {
      const item = {
        value,
        expiry: Date.now() + (ttl * 1000)
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      console.error('Cache error:', e);
    }
  }
};

// Fetch with caching
async function cachedFetch(url, options = {}) {
  const cacheKey = `steam_api_${url}`;
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}

// Main data fetching functions
async function fetchSteamProfile() {
  return cachedFetch(`${WORKER_URL}/player?steamid=${STEAM_ID}`);
}

async function fetchOwnedGames() {
  return cachedFetch(`${WORKER_URL}/ownedGames?steamid=${STEAM_ID}`);
}

async function fetchRecentlyPlayed() {
  return cachedFetch(`${WORKER_URL}/recentlyPlayed?steamid=${STEAM_ID}`);
}

async function fetchGameAchievements(appid) {
  return cachedFetch(`${WORKER_URL}/achievements?steamid=${STEAM_ID}&gameid=${appid}`);
}

async function fetchGameDetails(appid) {
  try {
    // Use our Cloudflare worker instead of directly calling Steam API
    const response = await fetch(`${WORKER_URL}/gameDetails?gameid=${appid}`);
    
    if (!response.ok) {
      console.error(`Error fetching game details for ${appid}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data && data[appid] && data[appid].success) {
      return {
        name: data[appid].data.name,
        headerImage: data[appid].data.header_image
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching game details for ${appid}:`, error);
    return null;
  }
}

// Process game data
async function processGameData(game, isRecentGame = false) {
  if (!game || !game.appid) {
    console.error("Invalid game data received:", game);
    return {
      name: "Unknown Game",
      playtime: 0,
      headerImage: "https://placehold.co/600x400?text=Game+Not+Found",
      achievementPercentage: 0,
      achievementsUnlocked: 0,
      achievementsTotal: 0,
      lastPlayed: "Unknown",
      appid: 0
    };
  }
  
  const appid = game.appid;
  const playtimeField = isRecentGame ? 'playtime_2weeks' : 'playtime_forever';
  const playtimeHours = Math.floor(game[playtimeField] / 60);
  
  // Get achievements
  let achievementData = { total: 0, unlocked: 0, percentage: 0 };
  try {
    const achievementResponse = await fetchGameAchievements(appid);
    
    if (achievementResponse?.playerstats?.achievements) {
      const achievements = achievementResponse.playerstats.achievements;
      const total = achievements.length || 0;
      const unlocked = achievements.filter(a => a.achieved === 1).length || 0;
      const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
      
      achievementData = { total, unlocked, percentage };
    }
  } catch (error) {
    console.error(`Failed to fetch achievements for ${appid}:`, error);
  }
  
  // Fetch game details if needed
  let gameName = game.name;
  let headerImage = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
  
  if (!gameName) {
    try {
      const gameDetails = await fetchGameDetails(appid);
      if (gameDetails) {
        gameName = gameDetails.name;
        headerImage = gameDetails.headerImage || headerImage;
      }
    } catch (error) {
      console.error(`Failed to fetch game details for ${appid}:`, error);
    }
  }
  
  const lastPlayed = isRecentGame 
    ? "Last 2 weeks" 
    : game.rtime_last_played 
      ? new Date(game.rtime_last_played * 1000).toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}).replace(/\//g, '/')
      : "Unknown";
  
  return {
    name: gameName || `Game ${appid}`,
    playtime: playtimeHours,
    headerImage: headerImage,
    achievementPercentage: achievementData.percentage,
    achievementsUnlocked: achievementData.unlocked,
    achievementsTotal: achievementData.total,
    lastPlayed: lastPlayed,
    appid
  };
}

// Create game card HTML
function createGameCardHTML(game, containerClass) {
  // Create the achievements section based on whether the game has achievements
  let achievementsHTML = '';
  
  if (game.achievementsTotal === 0) {
    // For games with no achievements
    achievementsHTML = `
      <div class="achievement-progress mb-2" data-astro-cid-7eti3dit>
        <div class="achievement-text has-text-centered" data-astro-cid-7eti3dit>
          <span data-astro-cid-7eti3dit>No achievements available</span>
        </div>
      </div>
    `;
  } else {
    // For games with achievements
    achievementsHTML = `
      <div class="achievement-progress mb-2" data-astro-cid-7eti3dit>
        <progress
          class="progress is-primary"
          value="${game.achievementPercentage}"
          max="100"
          data-astro-cid-7eti3dit
        ></progress>
        <div class="achievement-text" data-astro-cid-7eti3dit>
          <span data-astro-cid-7eti3dit>${game.achievementPercentage}% complete</span>
          <span data-astro-cid-7eti3dit>${game.achievementsUnlocked}/${game.achievementsTotal}</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="${containerClass}" data-astro-cid-7eti3dit>
      <div class="card is-glass game-card" data-astro-cid-7eti3dit>
        <div class="card-image" data-astro-cid-7eti3dit>
          <figure class="image is-16by9" data-astro-cid-7eti3dit>
            <img
              src="${game.headerImage}"
              alt="${game.name}"
              loading="lazy"
              data-astro-cid-7eti3dit="true"
              width="460"
              height="215"
              decoding="async"
            />
            <div class="playtime-badge" data-astro-cid-7eti3dit>
              <span class="icon" data-astro-cid-7eti3dit>
                <i class="fas fa-clock" data-astro-cid-7eti3dit></i>
              </span>
              <span data-astro-cid-7eti3dit>${game.playtime} hrs</span>
            </div>
          </figure>
        </div>
        <div class="card-content" data-astro-cid-7eti3dit>
          <h3 class="title is-5 has-text-white mb-2" data-astro-cid-7eti3dit>
            ${game.name}
          </h3>
          ${achievementsHTML}
          <p class="has-text-grey-light is-size-7" data-astro-cid-7eti3dit>
            Last played: ${game.lastPlayed}
          </p>
        </div>
      </div>
    </div>
  `;
}

// Update profile stats
function updateProfileStats(profileData, ownedGamesData) {
  const playerData = profileData.response.players[0] || {};
  
  // Profile name and image
  const profileNameElement = document.querySelector('#steam-profile-title');
  if (profileNameElement) {
    profileNameElement.innerHTML = `${playerData.personaname || "Civer_mau"} <span class="level-text" data-astro-cid-7eti3dit>• Level 31</span>`;
  }
  
  const profileImgElements = document.querySelectorAll('.profile-image-container img');
  profileImgElements.forEach(el => {
    el.src = playerData.avatarfull || "https://avatars.steamstatic.com/df381e79f6cd5399aa0cf6600b0f44d3db06cda8_full.jpg";
  });
  
  // Game count stats
  const gameCountElements = document.querySelectorAll('.stat-item:first-child .stat-value');
  const gameCount = ownedGamesData.response.game_count || 0;
  gameCountElements.forEach(el => {
    el.textContent = gameCount;
  });
  
  // Status indicator
  if (playerData.personastate !== undefined) {
    const statusColors = {
      0: "#6e7376", // Offline - grey
      1: "#43b581", // Online - green
      2: "#faa61a", // Busy - orange
      3: "#faa61a", // Away - orange
      4: "#faa61a", // Snooze - orange
      5: "#faa61a", // Looking to trade - orange
      6: "#faa61a"  // Looking to play - orange
    };
    
    const statusColor = statusColors[playerData.personastate] || "#6e7376";
    const statusIndicator = document.createElement('span');
    statusIndicator.style.display = 'inline-block';
    statusIndicator.style.width = '10px';
    statusIndicator.style.height = '10px';
    statusIndicator.style.borderRadius = '50%';
    statusIndicator.style.backgroundColor = statusColor;
    statusIndicator.style.marginLeft = '10px';
    
    // Append status indicator only to the specific profile name element
    if (profileNameElement && !profileNameElement.querySelector('.status-indicator')) {
      profileNameElement.appendChild(statusIndicator.cloneNode(true));
    }
  }
}

// Main function to update the page
async function updateSteamData() {
  try {
    // Show loading state
    const mostPlayedContainer = document.querySelector('.most-played-grid');
    const mostPlayedScroll = document.querySelector('.most-played-scroll .scrollable-games-wrapper');
    const recentlyPlayedContainer = document.querySelector('.scrollable-games-container:not(.most-played-scroll) .scrollable-games-wrapper');
    
    if (mostPlayedContainer) mostPlayedContainer.innerHTML = '<div class="column is-full has-text-centered"><p>Loading most played games...</p></div>';
    if (mostPlayedScroll) mostPlayedScroll.innerHTML = '<div class="scrollable-game-card" data-astro-cid-7eti3dit><p>Loading...</p></div>';
    if (recentlyPlayedContainer) recentlyPlayedContainer.innerHTML = '<div class="scrollable-game-card" data-astro-cid-7eti3dit><p>Loading...</p></div>';
    
    // Fetch all necessary data in parallel
    const [profileData, ownedGamesData, recentlyPlayedData] = await Promise.all([
      fetchSteamProfile(),
      fetchOwnedGames(),
      fetchRecentlyPlayed()
    ]);
    
    // Update profile information
    updateProfileStats(profileData, ownedGamesData);
    
    // Sort games by playtime
    const sortedGames = [...(ownedGamesData.response.games || [])].sort((a, b) => b.playtime_forever - a.playtime_forever);
    const topGames = sortedGames.slice(0, 10); // Changed from 4 to 8 games
    
    // Get recently played games
    const recentGames = recentlyPlayedData.response.games || [];
    
    // Process most played games
    const mostPlayedGamesPromises = topGames.map(game => processGameData(game, false));
    const mostPlayedGames = await Promise.all(mostPlayedGamesPromises);
    
    // Process recently played games
    const recentlyPlayedGamesPromises = recentGames.map(game => processGameData(game, true));
    const recentlyPlayedGames = await Promise.all(recentlyPlayedGamesPromises);
    
    // Update most played games (desktop/tablet view)
    if (mostPlayedContainer) {
      // Convert most played section to use scrollable container
      mostPlayedContainer.innerHTML = `
        <div class="scrollable-games-container" data-astro-cid-7eti3dit>
          <div class="scrollable-games-wrapper" data-astro-cid-7eti3dit>
            ${mostPlayedGames.map(game => 
              createGameCardHTML(game, 'scrollable-game-card')
            ).join('')}
          </div>
          <div class="scroll-indicator scroll-left" data-astro-cid-7eti3dit>
            <i class="fas fa-chevron-left" data-astro-cid-7eti3dit></i>
          </div>
          <div class="scroll-indicator scroll-right" data-astro-cid-7eti3dit>
            <i class="fas fa-chevron-right" data-astro-cid-7eti3dit></i>
          </div>
        </div>
      `;
    }
    
    // Update recently played games
    if (recentlyPlayedContainer) {
      if (recentlyPlayedGames.length === 0) {
        recentlyPlayedContainer.innerHTML = '<div class="column is-full has-text-centered"><p>I have not played any games recently, if you get to see this, either the page is broken or I died, cus I will never be 2 weeks without playing a game.</p></div>';
      } else {
        recentlyPlayedContainer.innerHTML = recentlyPlayedGames.map(game => 
          createGameCardHTML(game, 'scrollable-game-card')
        ).join('');
      }
    }
    
    // Initialize scroll functionality
    setTimeout(() => {
      if (typeof t === 'function') {
        t();
      } else {
        console.log('Scroll function not available yet, initializing manually');
        // Fallback implementation if t function is not available
        document.querySelectorAll(".scrollable-games-wrapper").forEach((e) => {
          const n = e.closest(".scrollable-games-container");
          if (!n) return;
          const o = n.querySelector(".scroll-left"),
            l = n.querySelector(".scroll-right");
          if (e && o && l) {
            const s = () => (window.innerWidth < 768 ? e.clientWidth * 0.85 : 300);
            o.addEventListener("click", () => {
              e.scrollBy({ left: -s(), behavior: "smooth" });
            });
            l.addEventListener("click", () => {
              e.scrollBy({ left: s(), behavior: "smooth" });
            });
            const c = () => {
              (o.style.display = e.scrollLeft > 20 ? "flex" : "none"),
                (l.style.display =
                  e.scrollLeft < e.scrollWidth - e.clientWidth - 20
                    ? "flex"
                    : "none");
            };
            e.addEventListener("scroll", c), setTimeout(c, 100);
          }
        });
      }
    }, 500); // Give some time for DOM to update
    
  } catch (error) {
    console.error('Failed to update Steam data:', error);
    
    // Show error message
    const containers = [
      document.querySelector('.most-played-grid'),
      document.querySelector('.most-played-scroll .scrollable-games-wrapper'),
      document.querySelector('.scrollable-games-container:not(.most-played-scroll) .scrollable-games-wrapper')
    ];
    
    containers.forEach(container => {
      if (container) {
        container.innerHTML = '<div class="column is-full has-text-centered"><p>Failed to load Steam data. Please try again later.</p></div>';
      }
    });
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  s();
  t();
  r();
  updateSteamData();
});

document.addEventListener("astro:page-load", () => {
  s();
  t();
  r();
  updateSteamData();
});

document.addEventListener("astro:before-preparation", u);
document.addEventListener("astro:after-swap", t); 