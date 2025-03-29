import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "chase";
let password = "password";

async function initializeScreen() {
    // this function is getting invoked when the page first loads:
    token = await getAccessToken(rootURL, username, password);
    showNav();
    loadData();
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
//await / async syntax:

function loadData() {
    getPosts();
    getProfile();
    getSuggestions();
    getStories();
}

async function getPosts() {
    const response = await fetch(
        "https://photo-app-secured.herokuapp.com/api/posts/?limit=10",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        renderPosts(data);
    }
}

function renderBookmarkButton(postJSON) {
    let template = "";
    if (postJSON.current_user_bookmark_id) {
        template = `
            <button onclick="window.deleteBookmark(${postJSON.current_user_bookmark_id})">
                <i class="fas fa-bookmark"></i>
            </button>
        `;
    } else {
        template = `
            <button onclick="window.createBookmark(${postJSON.id})">
                <i class="far fa-bookmark"></i>
            </button>
        `;
    }
    return template;
}

function renderPost(postJSON) {
    let comments = "";
    for (let comment of postJSON.comments) {
        comments += `                <p class="text-sm mb-3">
                      <strong>${comment.user.username}</strong>
                      ${comment.text}
                  </p>`;
    }
    const template = ` <section class="bg-white border mb-10">
              <div class="p-4 flex justify-between">
                  <h3 class="text-lg font-Comfortaa font-bold">${
                    postJSON.user.username
                  }</h3>
                  <button aria-label="actions" class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
              </div>
              <img src="${
                postJSON.image_url
              }" alt="placeholder image" width="300" height="300"
                  class="w-full bg-cover">
              <div class="p-4">
                  <div class="flex justify-between text-2xl mb-3">
                      <div>
                          ${renderLikeButton(postJSON)}
                          <button aria-label="Add comment" ><i class="far fa-comment"></i></button>
                          <button aria-label="Share post"><i class="far fa-paper-plane"></i></button>
                      </div>
                      <div>
                          ${renderBookmarkButton(postJSON)}
                      </div>
                  </div>
                  <p class="font-bold mb-3">${postJSON.likes.length} likes</p>
                  <div class="text-sm mb-3">
                      <p>
                          <strong>${postJSON.user.username}</strong>
                          ${
                            postJSON.caption
                          } <button class="button" style="color : blue">more</button>
                      </p>
                      <p style="margin-top: 5px" class="uppercase text-gray-500 text-xs">${
                        postJSON.display_time
                      } </p>
                  </div>
                  ${renderComments(postJSON)}
              </div>
              <div class="flex justify-between items-center p-3">
                  <div class="flex items-center gap-3 min-w-[80%]">
                      <i class="far fa-smile text-lg"></i>
                      <input type="text" class="min-w-[80%] focus:outline-none" aria-label="Add a comment" placeholder="Add a comment...">
                  </div>
                  <button class="text-blue-500 py-2">Post</button>
              </div>
          </section>`;
    const container = document.querySelector("main");
    container.insertAdjacentHTML("beforeend", template);
}

function renderPosts(postListJSON) {
    const container = document.querySelector("main");
    const storiesHeader = container.querySelector("header");
    container.innerHTML = "";
    container.appendChild(storiesHeader);
    
    postListJSON.forEach(renderPost);
}

function renderComments(postJSON) {
    let comments = "";
    let l = postJSON.comments.length;
    if (l < 2 && l > 0) {
        comments += `                <p class="text-sm mb-3">
                      <strong>${postJSON.comments[0].user.username}</strong>
                      ${postJSON.comments[0].text}
                  </p>`;
        comments += `                <p class="uppercase text-gray-500 text-xs">${
            postJSON.comments[l - 1].display_time
        }</p>`;
    }
    if (l > 1) {
        comments += `<button class="link" style="color : blue">View all ${l} comments</button>`;
        comments += `             <div style="margin-top: 5px" class="comments"><div>  <p class="text-sm mb-3">
                      <strong>${postJSON.comments[l - 1].user.username}</strong>
                      ${postJSON.comments[l - 1].text}
                  </p></div></div>`;
        comments += `           <p class="uppercase text-gray-500 text-xs">${
            postJSON.comments[l - 1].display_time
        }</p>`;
    }
    return comments;
}

function renderLikeButton(postJSON) {
    return postJSON.current_user_like_id ?
        `<button aria-label="Like post" onclick="deleteLike(${postJSON.current_user_like_id})"><i class="fas fa-heart" style="color: red"></i></button>` :
        `<button aria-label="Like post" onclick="addLike(${postJSON.id})"><i class="far fa-heart"></i></button>`;
}

window.createBookmark = async function (postId) {
    const postData = {
        post_id: postId,
    };
    const response = await fetch(
        "https://photo-app-secured.herokuapp.com/api/bookmarks/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        }
    );
    if (response.ok) {
        getPosts();
    }
};

window.deleteBookmark = async function (bookmarkId) {
    const response = await fetch(
        `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    );
    if (response.ok) {
        getPosts();
    }
};

window.deleteLike = async function (postData) {
    const response = await fetch(
        `https://photo-app-secured.herokuapp.com/api/likes/${postData}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.ok) {
        getPosts();
    }
};

window.addLike = async function (postID) {
    const postData = {
        post_id: postID,
    };
    const response = await fetch(
        "https://photo-app-secured.herokuapp.com/api/likes/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        }
    );
    if (response.ok) {
        getPosts();
    }
};

async function getProfile() {
    const response = await fetch(`${rootURL}/api/profile/`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
        renderRightPanelTop(await response.json());
    }
}

function renderRightPanelTop(profile) {
    document.querySelector("#right_panel").innerHTML = `
      <img src="${profile.thumb_url}" alt="user profile image" class="rounded-full w-16" />
      <h2 class="font-Comfortaa font-bold text-2xl">${profile.username}</h2>`;
}

async function getSuggestions() {
    const response = await fetch(
        "https://photo-app-secured.herokuapp.com/api/suggestions/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.ok) {
        renderSuggestions(await response.json());
    }
}

function renderSuggestions(data) {
    data.forEach(renderSuggestion);
}

function renderSuggestion(data) {
    let target = document.querySelector(".mt-4");
    let snippet = `        <section class="flex justify-between items-center mb-4 gap-2">
            <img alt="Profile picture" src="${data.thumb_url}" class="rounded-full" />
            <div class="w-[180px]">
              <p class="font-bold text-sm">${data.username}</p>
              <p class="text-gray-500 text-xs">suggested for you</p>
            </div>
            <button onclick="followToggle(
              ${data.id}
            )" class="text-blue-500 text-sm py-2">follow</button>
          </section>`;
    target.insertAdjacentHTML("beforeend", snippet);
}

async function getStories() {
    const response = await fetch(
        "https://photo-app-secured.herokuapp.com/api/stories/",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (response.ok) {
        renderStories(await response.json());
    }
}

function renderStories(data) {
    data.forEach(renderStory);
}

function renderStory(data) {
    let target = document.querySelector("#stories");
    let snippet = `        <div class="flex flex-col justify-center items-center">
            <img
              src="${data.user.thumb_url}"
              class="rounded-full border-4 border-gray-300"
              alt = "${data.text}"
            />
            <p class="text-xs text-gray-500">${data.user.username}</p>
          </div>`;
    target.insertAdjacentHTML("beforeend", snippet);
}

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();