
const overview = document.querySelector(".overview");

const username = "kikang20";

const repoList = document.querySelector(".repo-list")

const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const backToRepo = document.querySelector(".view-repos");

const filterInput = document.querySelector(".filter-repos");





const getProfile = async function (){
    const user = await fetch(`https://api.github.com/users/${username}`);
    const data = await user.json();
    
    displayInfos(data);
};

getProfile();

const displayInfos = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = ` <figure>
    <img alt="user avatar" src=${infos.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(div);
  fetchData(username);
};

const fetchData = async function (username){
  const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();

  displayRepos(repoData);
};

const displayRepos = function (repos){
  filterInput.classList.remove("hide");
  for(const repo of repos){
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${item.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function (e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    getSpecificRepo(repoName);
  }
});

const getSpecificRepo = async function(repoName){
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await request.json();
  

  const fetchLanguages = await fetch (repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  

  const languages =[];
  for (const language in languageData){
    languages.push(language);

    displaySpecificRepo(repoInfo, languages);

  }
};

const displaySpecificRepo = function (repoInfo, languages){
  backToRepo.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allReposContainer.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.dafault_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(div);
    
};


backToRepo.addEventListener("click", function (){
  allReposContainer.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepo.classList.add("hide");

});

filterInput.addEventListener("input", function(e){
  const captureText = e.target.value;
  const repos =document.querySelectorAll(".repo");
  const lowercaseValue = captureText.toLowerCase();

  for(const repo of repos){
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLowerText)){
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }

  };
});