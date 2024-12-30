async function fetchRepos() {
    try {
        const response = await fetch(
            "https://api.github.com/users/Civermau/repos"
        );

        // Check if the API limit has been reached
        const remaining = response.headers.get('X-RateLimit-Remaining');
        const repoCardsContainer = document.getElementById("repo-cards");

        if (remaining === '0') {
            const resetTime = new Date(response.headers.get('X-RateLimit-Reset') * 1000);
            const message = document.createElement("p");
            message.className = "column subtitle is-full has-text-centered";
            message.textContent = `API rate limit reached, repos will not be shown. Please try again at ${resetTime.toLocaleString()}.`;
            repoCardsContainer.appendChild(message);
            return;
        }

        const repos = await response.json();

        // Determine the number of repos to display based on screen size
        let repoLimit;
        if (window.matchMedia("(max-width: 768px)").matches) {
            // Mobile
            repoLimit = 2;
        } else if (window.matchMedia("(max-width: 1024px)").matches) {
            // Tablet
            repoLimit = 4;
        } else {
            // Desktop
            repoLimit = 8;
        }

        // Display only the limited number of repos
        const limitedRepos = repos.slice(0, repoLimit);

        for (const repo of limitedRepos) {
            const languagesResponse = await fetch(repo.languages_url);
            const languages = await languagesResponse.json();
            const languagesList =
                Object.keys(languages).join(", ") || "Languages not specified";

            const card = document.createElement("div");
            card.className = "column is-one-quarter hidden-card";

            card.innerHTML = `
                <a href="${repo.html_url}" target="_blank" class="card-link">
                    <div class="card has-text-centered">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="${repo.html_url}/raw/master/Cover.png" alt="${repo.name} Cover Image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">${repo.name}</p>
                                    <p class="subtitle is-6">${languagesList}</p>
                                </div>
                            </div>
                            <div class="content">
                                ${repo.description || "No description available."}
                            </div>
                            <div class="stats">
                                ⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}
                            </div>
                        </div>
                    </div>
                </a>
            `;

            repoCardsContainer.appendChild(card);
        }

        // Set up Intersection Observer for repo cards
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.remove('hidden-card');
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        observer.unobserve(entry.target);
                    }, index * 100); // Delay of 100ms between each card
                }
            });
        }, observerOptions);

        // After all cards have been animated, animate the button
        const projectsButton = document.getElementById('projects-button');
        observer.observe(projectsButton);

        // Use the existing observer for both the repo cards and the button
        const cards = repoCardsContainer.querySelectorAll('.column');
        cards.forEach(card => {
            observer.observe(card);
        });

        observer.observe(projectsButton);

    } catch (error) {
        console.error("Error fetching repos:", error);
    }
}

fetchRepos(); 