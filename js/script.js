//where your profile information will appear
const overview = document.querySelector(".overview");
//username
const username = "kikang20";
//select the unordered list to display the repos
const repoList = document.querySelector(".repo-list")

const getProfile = async function (){
    const user = await fetch(`https://api.github.com/users/${username}`);
    const infos = await user.json();
    
    displayInfos(infos);
};

getProfile();

const displayInfos = function (infos) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = ` <figure>
    <img alt="user avatar" src=${infos.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${infos.name}</p>
    <p><strong>Bio:</strong> ${infos.bio}</p>
    <p><strong>Location:</strong> ${infos.location}</p>
    <p><strong>Number of public repos:</strong> ${infos.num_pub_repos}</p>
  </div> `;
  overview.append(div);
  fetchData();
};

const fetchData = async function (){
  const secondFetch = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const secondAwait = await secondFetch.json();

  displayData(secondAwait);
};

const displayData = function (repos){
  for(const items of repos){
    const itemList = document.createElement("li");
    itemList.classList.add("repo");
    itemList.innerHTML = `<h3>${repos.name}</h3>`;
    repoList.append(itemList);
  }
}