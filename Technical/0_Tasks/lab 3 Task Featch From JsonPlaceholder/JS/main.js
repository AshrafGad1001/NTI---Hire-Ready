let postsContainer = document.getElementsByClassName("all-posts")[0];
let usersContainer = document.getElementsByClassName("all-users")[0];





function getPosts() {
    let Request = new XMLHttpRequest();
    Request.open("GET", "https://jsonplaceholder.typicode.com/posts");
    Request.send();
    Request.onload = function () {
        if (Request.status == 200 && Request.readyState == 4) {
            let posts = JSON.parse(Request.response);
            postsContainer.innerHTML = "";
            for (let i = 0; i < posts.length; i++) {
                let post = `
                            <div id="post">
                                <h3>💁🏻‍♂️${posts[i].title}</h3>
                                <h4>${posts[i].body}</h4>
                            </div>
                            `;
                postsContainer.innerHTML += post;
            }
        }
        else {
            console.log("Error: " + Request.status);
        }
    }
}


function getUsers() {
    let Request = new XMLHttpRequest();
    Request.open("GET", "https://jsonplaceholder.typicode.com/users");
    Request.send();
    Request.onload = function () {
        if (Request.status == 200 && Request.readyState == 4) {
            let users = JSON.parse(Request.response);
            usersContainer.innerHTML = "";
            for (let i = 0; i < users.length; i++) {
                let user = `
                            <div id="user" onclick="userclickedOnPost()">
                                <h3>${users[i].name}</h3>
                                <p>📩${users[i].email}</p>
                            </div>
                            `;
                usersContainer.innerHTML += user;
            }
        }
        else {
            console.log("Error: " + Request.status);
        }
    }
}


getUsers();
getPosts();