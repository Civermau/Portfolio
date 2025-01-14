document.addEventListener('DOMContentLoaded', async () => {
    const repoList = document.querySelector('.repo-list');
    const repoDetails = document.querySelector('.repo-details');

    try {
        const response = await fetch("https://api.github.com/users/Civermau/repos");
        const repos = await response.json();

        function renderRepoList() {
            repoList.innerHTML = '';
            repos.forEach((repo, index) => {
                const repoItem = document.createElement('div');
                repoItem.style.backgroundColor = '#212121';
                repoItem.className = 'box repo-list-box has-text-white animate__animated animate__fadeInUp';
                repoItem.style.animationDelay = `${index * 0.2}s`;
                const topicsHTML = repo.topics.map(topic => `<span class="tag is-info">${topic}</span>`).join(' ');
                repoItem.innerHTML = `
                    <p class="title">${repo.name}</p>
                    <p class="subtitle" style="font-size: 0.8rem;">${repo.description || "No description available."}</p>
                    <div class="tags is-centered">${topicsHTML || "<span class='tag'>No tags available.</span>"}</div>
                `;
                repoItem.addEventListener('click', () => displayRepoDetails(index));
                repoList.appendChild(repoItem);

                // Remove animation class after animation ends
                repoItem.addEventListener('animationend', () => {
                    repoItem.classList.remove('animate__animated', 'animate__fadeInUp');
                });
            });
        }

        async function displayRepoDetails(index) {
            const repo = repos[index];
            try {
                const readmeResponse = await fetch(`https://api.github.com/repos/Civermau/${repo.name}/readme`, {
                    headers: { 'Accept': 'application/vnd.github.v3.raw' }
                });
                if (!readmeResponse.ok) {
                      throw new Error(`Failed to fetch README: ${readmeResponse.statusText}`);
                }
                const readmeContent = await readmeResponse.text();

                const readmeHTML = marked.parse(readmeContent);

                repoDetails.innerHTML = `
                    <div class="box has-text-white animate__animated animate__fadeInUp" style="background-color: #212121; transform: translateY(-20px);">
                        <div class="columns is-mobile">
                            <div class="column is-9">
                                <h2 class="title has-text-centered is-size-1">${repo.name}</h2>
                                <p class="has-text-centered">${repo.description || "No description available."}</p>
                            </div>
                            <div class="column is-3 has-text-centered">
                                <a href="${repo.html_url}" target="_blank" class="button is-link" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #2B2B2B;">Open in GitHub </a>
                            </div>
                        </div>
                        <div class="content">
                            <h3 class="subtitle"></h3>
                            <div style="background-color: #2b2b2b; padding: 10px; border-radius: 5px;">${readmeHTML}</div>
                        </div>
                    </div>
                `;


            } catch (error) {
                console.error("Error fetching README:", error);
                repoDetails.innerHTML = `
                    <div class="box has-background-grey-dark has-text-white">
                        <h2 class="title">${repo.name}</h2>
                        <p>${repo.description || "No description available."}</p>
                        <p>Error loading README.</p>
                    </div>
                `;
            }
        }

        const remaining = response.headers.get('X-RateLimit-Remaining');
        if (remaining === '0') {
            const resetTime = new Date(response.headers.get('X-RateLimit-Reset') * 1000);
            const message = document.createElement('p');
            message.className = 'box has-background-grey-dark has-text-white';
            message.textContent = `API rate limit reached, repos will not be shown. Please try again at ${resetTime.toLocaleString()}.`;
            repoList.appendChild(message);
            return;
        }

        renderRepoList();
    } catch (error) {
        console.error("Error fetching repos:", error);
    }
});
