function userInformationHTML(user) {
    /**
     * To show user information on the webpage when fetch from github API
     * 
     */

    return `<h2>${user.name}
        <span class="small-name">
        (@<a href=${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url} width="80" height="80" alt="${user.login}">
            </a>
        </div>
        <p>Followers: ${user.followers} Following: ${user.following} <br> Repo: ${user.public_repos}</p>
    </div>
    `
}

function repoInformationHTML(repos) {
    /**
     * To display a list of repositories of user
     */
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repo!</div>`;
    }

    let listItemRepo = repos.map(function(repo) {
        return `
        <li>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </li>`;
    });

    return `
    <div class="clearfix repo-list">
        <p><strong>List:</strong></p>
        <ul>
            ${listItemRepo.join('\n')}
        </ul>
    </div>`;

}

function fetchGitHubInformation(event) {
    /**
     * To fetch data from GitHub API
     * 
     */
    $('#gh-user-data').html('');
    $('#gh-repo-data').html('');
    let username = $('#gh-username').val();
    
    // If no input in username: a message prompts below
    if (!username) {
        $('#gh-user-data').html(`<h2>Please enter a GitHub username!</h2>`);
        return;
    }

    // Add loader gif when typing on the input field
    $('#gh-user-data').html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`
    );
    
    // contact the GitHub API
    $.when(
        //get with JSON
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ) .then(
        // parameters: 2 functions = okResponse and errorResponse
        function(firstResponse, secondResponse) {
            // response by JSON
            let userData = firstResponse[0];
            let repoData = secondResponse[0];
            $('#gh-user-data').html(userInformationHTML(userData));
            $('#gh-repo-data').html(repoInformationHTML(repoData));
        }, function(errorResponse) {
            // errors
            if (errorResponse.status === 404) {
                $('#gh-user-data').html(
                    `<h2>No info found for user ${username}</h2>`
                )
            } else {
                console.log(errorResponse);
                $('#gh-user-data').html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                )
            }
        });
}

$(document).ready(fetchGitHubInformation);

/**
 * else if (errorResponse.status === 403) {
                let resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $('·gh-user-data').html(`<h4>Too many request. Please wait until ${resetTime.toLocaleTimeString()}</h4>`);
 */