document.addEventListener('DOMContentLoaded', () => {
    const repoList = document.querySelector('.repo-list');
    const repoDetails = document.querySelector('.repo-details');

    // Sample data for repositories
    const repositories = [
        { name: 'Repo 1', description: 'Description for Repo 1', details: 'Full details for Repo 1' },
        { name: 'Repo 2', description: 'Description for Repo 2', details: 'Full details for Repo 2' },
        // Add more repositories as needed
    ];

    // Function to render the list of repositories
    function renderRepoList() {
        repoList.innerHTML = '';
        repositories.forEach((repo, index) => {
            const repoItem = document.createElement('div');
            repoItem.className = 'box has-background-grey-dark has-text-white';
            repoItem.textContent = repo.name;
            repoItem.addEventListener('click', () => displayRepoDetails(index));
            repoList.appendChild(repoItem);
        });
    }

    // Function to display details of the selected repository
    function displayRepoDetails(index) {
        const repo = repositories[index];
        repoDetails.innerHTML = `
            <div class="box has-background-grey-dark has-text-white">
                <h2 class="title">${repo.name}</h2>
                <p>${repo.details}</p>
            </div>
        `;
    }

    // Initial render
    renderRepoList();
});
