
async function renderUsers() {


    const container = document.getElementById('user-container');


    container.innerHTML = `
    <div class="loading">
        <div class="spinner"></div>
        <p>Loading users...</p>
    </div>`;

    try {

        const response = await fetch('https://jsonplaceholder.typicode.com/users');


        if (!response.ok && response.status !== 200) {
            throw new Error('Network response was not OK: ' + response.status);
        }


        const users = await response.json();

        console.log('Fetched users:', users);
        container.innerHTML = '';

        users.forEach(function (user) {


            const card = document.createElement('div');
            card.classList.add('user-card');


            card.style.border = '1px solid #dde2ef';
            card.style.padding = '1.25rem';
            card.style.margin = '0';


            const avatar = document.createElement('div');
            avatar.classList.add('avatar');
            avatar.textContent = user.name.charAt(0).toUpperCase();


            const nameEl = document.createElement('h3');
            nameEl.textContent = user.name;


            const emailEl = document.createElement('p');
            emailEl.classList.add('email');
            emailEl.textContent = '✉ ' + user.email;


            const usernameEl = document.createElement('p');
            usernameEl.classList.add('username');
            usernameEl.textContent = '@' + user.username;


            const companyEl = document.createElement('span');
            companyEl.classList.add('company');
            companyEl.textContent = user.company.name;


            const viewPostsBtn = document.createElement('button');
            viewPostsBtn.classList.add('btn-view-posts');
            viewPostsBtn.textContent = 'View Last Posts';


            const firstPostDiv = document.createElement('div');
            firstPostDiv.classList.add('first-post');

            const postLabel = document.createElement('div');
            postLabel.classList.add('post-label');
            postLabel.textContent = 'Latest Post Title';

            const postTitleEl = document.createElement('div');
            postTitleEl.classList.add('post-title');

            firstPostDiv.appendChild(postLabel);
            firstPostDiv.appendChild(postTitleEl);


            const postErrorDiv = document.createElement('div');
            postErrorDiv.classList.add('post-error');


            viewPostsBtn.addEventListener('click', async function () {


                viewPostsBtn.disabled = true;
                viewPostsBtn.textContent = 'Loading...';
                firstPostDiv.style.display = 'none';
                postErrorDiv.style.display = 'none';

                try {

                    const postsResponse = await fetch(
                        'https://jsonplaceholder.typicode.com/users/' + user.id + '/posts'
                    );

                    if (!postsResponse.ok) {
                        throw new Error('Failed to fetch posts');
                    }

                    const posts = await postsResponse.json();


                    if (posts.length > 0) {
                        postTitleEl.textContent = posts[0].title;
                        firstPostDiv.style.display = 'block';
                        viewPostsBtn.textContent = 'Post Loaded';
                    } else {
                        postTitleEl.textContent = 'No posts found for this user.';
                        firstPostDiv.style.display = 'block';
                        viewPostsBtn.textContent = 'View last Posts';
                        viewPostsBtn.disabled = false;
                    }

                } catch (postErr) {

                    postErrorDiv.textContent = ' Sorry, failed to load posts!';
                    postErrorDiv.style.display = 'block';
                    viewPostsBtn.textContent = ' View Last Posts';
                    viewPostsBtn.disabled = false;
                    console.error('Posts fetch error:', postErr);
                }

            });

            card.appendChild(nameEl);
            card.appendChild(emailEl);
            card.appendChild(usernameEl);
            card.appendChild(companyEl);
            card.appendChild(viewPostsBtn);
            card.appendChild(firstPostDiv);
            card.appendChild(postErrorDiv);


            container.appendChild(card);

        });

    } catch (err) {

        container.innerHTML = '';
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-msg');
        errorDiv.textContent = 'Sorry, failed to load data!';
        container.appendChild(errorDiv);

        console.error('Fetch error:', err);
    }

}
renderUsers();


