const overviewDiv = document.querySelector(".overview"); //global variable to select div with class "overview". This is where personal profile info will appear.
const username = 1819367; //global variable with my GitHub username
const repoList = document.querySelector(".repo-list"); //global variable to select the unordered list to display the repos
const infoSection = document.querySelector(".repos"); //selects section where all the repo info appears
const repoData = document.querySelector(".repo-data"); //selects the section where the individual repo data will appear
const backButton = document.querySelector(".view-repos");//selects the back to repo gallery button
const filterInput = document.querySelector(".filter-repos"); //selects the input with the "Search by Name" placholder

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
    getRepos(username); //call the getRepos async function, pass it username as an argument
}

//an async function that fetchs my repos sorted by the most recently updated, up to 100 repos per page
const getRepos = async function (username) {
    const reposInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100]`);
    const repoData = await reposInfo.json();  //parses the information fetched
    // console.log(reposData); //logs the list of repos in the console
    displayRepos(repoData); //call the displayRepos function and pass it the json data

};
// getRepos(); test only

//function to display the information about my repos with the paramenter repos
const displayRepos = function (repos) {
    filterInput.classList.remove("hide"); //displays the input box
    for (const repo of repos) { //a for ... of loop to loop through the repos
        const li = document.createElement("li"); //create a new li element
        li.classList.add("repo"); //add the class of repo to the new li element
        li.innerHTML = `<h3>${repo.name}</h3>`; //an <h3> element with the repo name
        repoList.append(li); //append the li element to repoList unordered list element
    }
};

//add click event to the repoList on the unordered list,  pass it event (e) paramenter
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText; //variable to target the innerText where the event happens
        // console.log(repoName);//logs out 'clicked' event
        fetchOneRepo(repoName); //calls the async function when the click event happens
    }
});

//async function to get specific repo information that accepts repoName as a parameter
const fetchOneRepo = async function (repoName) {
    const soleRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await soleRepo.json(); //variable to resolve and save JSON response
    // console.log(repoInfo); //logs out fetched repo info in console

    //create a languages array
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json(); //variable to save the JSON response
    // console.log(languageData); //logs out the coding languages 

    const languages = []; //empty array to add each language
    for (let language in languageData) { //for ...in loop to loop over the object languageData
        languages.push(language); //push the language to the end of the languages array
    }
    displaySoleRepo(repoInfo, languages); //call the function to display the selected repo info
};

//create a function to display specific repo info that accepts two parameters- repoInfo and languages
const displaySoleRepo = function (repoInfo, languages) {
    backButton.classList.remove("hide"); //displays the back button 
    repoData.innerHTML = ""; //empty the HTML of the section with a class of "repo-data"
    repoData.classList.remove("hide"); //unhide the element with the "repo-data" class
    infoSection.classList.add("hide"); //hide the element with the class of "repos"

    //create a new div element to add certain information about the selected repo to the innerHTML
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(newDiv); //append the new div element to the section with a class (repo-data)
};
//Add a click event to the back button
backButton.addEventListener("click", function () {
    infoSection.classList.remove("hide"); //unhide (display) the section with the class of "repos"
    repoData.classList.add("hide"); //hide the section where the individual repo data will appear
    backButton.classList.add("hide"); //hide the back to repo gallery button itself
});
// Dynamic Search, add an input event to the search box, pass the event (e)
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value; //grab the value of the search text
    const repos = document.querySelectorAll(".repo"); //select all repo elements
    const lowerCaseText = searchText.toLowerCase(); //assign the lower case value of the search text

    for (const repo of repos) { //loop through each repo inside the repos element
        const repoName = repo.innerText.toLowerCase(); //createa a variable and assign it to the lower case value of the innertext of each repo

        if (repoName.includes(lowerCaseText)) { //check to see if the lowercase repo text includes the lowercase search text
            repo.classList.remove("hide"); //if the repo contains the text, show it.
        } else {
            repo.classList.add("hide"); //If the repo doesn't contain the text, hide it.
        }
    };
});