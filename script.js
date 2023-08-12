const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("florinpop17");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respDate = await resp.json();

  createUserCard(respDate);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respDate = await resp.json();

  addReposeToDate(respDate);
}

function createUserCard(user) {
  const cardHTML = `
      <div class="card">
          <div>
              <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
          </div>
          <div class="user-info">
              <h2>${user.name}</h2>
              <p>${user.bio}</p>

              <ul class="info">
                  <li>${user.followers}<strong>Followers</strong></li>
                  <li>${user.following}<strong>Following</strong></li>
                  <li>${user.public_repos}<strong>Repos</strong></li>
              </ul>

              <div id="repos"></div>
          </div>
      </div>
  `;

  main.innerHTML = cardHTML;
}

function addReposeToDate(repos) {
  const reposEl = document.getElementById(repos);

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const reposEl = document.createElement("a");
      reposEl.classList.add("repo");

      reposEl.hreef = repo.html_url;
      reposEl.target = _blank;
      reposEl.innerText = repo.name;

      reposEl.appendChild(reposEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
