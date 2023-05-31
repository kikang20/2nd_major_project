//where your profile information will appear
const overview = document.querySelector(".overview");
//username
const username = "kikang20";

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
};
