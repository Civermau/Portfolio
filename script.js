const reposContainer = document.getElementById('repos');
const loadMoreButton = document.getElementById('loadMore');
const loader = document.getElementById('dots');

let currentPage = 1;
const repoWidth = 380; // Adjust this value based on the actual width of each repo item
const perPage = Math.floor(window.innerWidth / repoWidth); // Calculate number of repos that fit on screen horizontally

// Function to fetch repositories
async function fetchRepositories(page, perPage) {
    const url = `https://api.github.com/users/Civermau/repos?per_page=${perPage}&page=${page}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        alert('Failed to fetch repositories. Please try again later.');
        return [];
    }
}

// Function to display repositories one by one
async function displayRepositories(repos) {
    const repoDivs = repos.map(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repo');

        // Wrap the entire repoDiv in an anchor tag
        const anchor = document.createElement('a');
        anchor.href = repo.html_url; // Set the link to the repository URL
        anchor.target = "_blank"; // Open in a new tab
        anchor.appendChild(repoDiv); // Append the repoDiv to the anchor

        const repoName = document.createElement('h2');
        const nameWithoutPrefix = repo.full_name.replace(/^Civermau\//, '');
        repoName.textContent = nameWithoutPrefix; // Use textContent for safety

        const repoImage = document.createElement('img');
        repoImage.src = `${repo.html_url}/raw/master/Cover.png`; // Adjust the path if necessary
        repoImage.alt = `${nameWithoutPrefix} Cover Image`;
        repoImage.classList.add('repo-cover'); // Add a class for styling

        const repoDesc = document.createElement('p');
        repoDesc.textContent = repo.description || 'No description provided.';

        const repoStats = document.createElement('div'); // Change to div
        repoStats.classList.add('repo-stats'); // Add class for styling
        repoStats.innerHTML = `⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}`;

        repoDiv.appendChild(repoName);
        repoDiv.appendChild(repoImage); 
        repoDiv.appendChild(repoDesc);
        repoDiv.appendChild(repoStats);

        reposContainer.appendChild(anchor); // Append the anchor to the container

        return repoDiv; // Return the created div
    });

    // Apply animation to each repository
    for (const repoDiv of repoDivs) {
        repoDiv.classList.add('animate'); // Add animation class
        await new Promise(resolve => setTimeout(resolve, 200)); // Adjust the delay as needed
    }
}

// Function to load repositories
async function loadRepositories() {
    loader.style.display = 'block';
    loadMoreButton.disabled = true;

    const repos = await fetchRepositories(currentPage, perPage);
    displayRepositories(repos);

    loader.style.display = 'none';
    loadMoreButton.disabled = false;

    currentPage++;
}

// Initial load
loadRepositories();

// Load more on button click
loadMoreButton.addEventListener('click', loadRepositories);
