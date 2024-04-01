const overviewDiv = document.querySelector(".overview"); //global variable to select div with class "overview". This is where personal profile info will appear.
const username = 1819367; //global variable with my GitHub username
const repoList = document.querySelector(".repo-list"); //global variable to select the unordered list to display the repos

//async function to fetch info from personal GitHub profile
const getProfile = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`); //fetches the GitHub profile
    const user = await userInfo.json();//parses the data captured.
    // console.log(user) //logs out the data grabbed
    displayData(user); //call the function displaying the user, pass the JSON data as an argument
};

getProfile(); //call the function to see the fetched data

//function to display user information that accepts the JSON data as a parameter
const displayData = function (user) {
    const userDiv = document.createElement("div"); //create a new div
    userDiv.classList.add("user-info"); //give the new div a class of "user-info"
    //populate the div with the folloing elements for figure, image and paragraphs
    //use the JSON data to grab the relevant properties for the 5 placholders
    userDiv.innerHTML = `
        <figure><img alt="user avatar" src=${user.avatar_url}></figure>
        <div>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Bio:</strong> ${user.bio}</p>
            <p><strong>Location:</strong> ${user.location}</p>
            <p><strong>Number of public repos:</strong> ${user.public_repos}</p>
            </div>
    `;
    overviewDiv.append(userDiv); //append the div to the overview element
    getRepos(); //call the getRepos async funciton
}

//an async function that fetchs my repos sorted by the most recently updated, up to 100 repos per page
const getRepos = async function () {
    const reposInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100]`);
    const repoData = await reposInfo.json();  //parses the information fetched
    // console.log(reposData); //logs the list of repos in the console
    displayRepos(repoData); //call the displayRepos function and pass it the json data

};
// getRepos(); test only

//function to display the information about my repos with the paramenter repos
const displayRepos = function (repos) {
    for (const repo of repos) { //a for ... of loop to loop through the repos
        const li = document.createElement("li"); //create a new li element
        li.classList.add("repo"); //add the class of repo to the new li element
        li.innerHTML = `<h3>${repo.name}</h3>`; //an <h3> element with the repo name
        repoList.append(li); //append the li element to repoList unordered list element
    }
};