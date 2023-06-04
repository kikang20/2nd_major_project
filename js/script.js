//where your profile information will appear
const overview = document.querySelector(".overview");
//username
const username = "kikang20";
//select the unordered list to display the repos
const repoList = document.querySelector(".repo-list")
//where repo infos appears
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
//button to back to repo gallary
const backToRepo = document.querySelector(".view-repos");
//input holder to search by name
const filterInput = document.querySelector(".filter-repos");





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
  filterInput.classList.remove("hide");
  for(const item of repos){
    const itemList = document.createElement("li");
    itemList.classList.add("repo");
    itemList.innerHTML = `<h3>${item.name}</h3>`;
    repoList.append(itemList);
  }
};

repoList.addEventListener("click", function (e){
  if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    getSpecificRepo(repoName);
  }
});

const getSpecificRepo = async function(repoName){
  const request = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await request.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch (repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages =[];
  for (const data in languageData){
    languages.push(data);

    displaySpecificRepo(repoInfo, languages);

  }
};

const displaySpecificRepo = function (repoInfo, languages){
  repoData.innerHTML = "";
  const div = document.createElement("div");
  repoData.classList.remove("hide");
  repos.classList.add("hide");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.dafaultbranch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(div);
    backToRepo.classList.remove("hide");
};


backToRepo.addEventListener("click", function (){
  repos.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepo.classList.add("hide");

});

filterInput.addEventListener("input", function(e){
  const captureText = e.target.value;
  const reposs =document.querySelectorAll(".repo");
  const lowercaseValue = captureText.toLowerCase();

  for(const asd of reposs){
    const lowerCaseEachRepo = asd.innerText.toLowerCase();
    if (lowerCaseEachRepo.includes(lowercaseValue)){
      asd.classList.remove("hide");
    } else {
      asd.classList.add("hide");
    }

  };
});