const overviewDiv = document.querySelector(".overview"); //global variable to select div with class "overview". This is where personal profile info will appear.
const username = 1819367; //global variable with my GitHub username

//async function to fetch info from personal GitHub profile
const getProfile = async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`); //fetches the GitHub profile
    const user = await userInfo.json();//parses the data captured.
    console.log(user) //logs out the data grabbed
    displayData(user); //call the function displaying the user, pass the JSON data as an argument
};

getProfile(); //call the function to see the fetched data

//function to display user information that accepts the JSON data as a parameter
const displayData = function(user) {
    const userDiv = document.createElement("div"); //create a new div
    userDiv.classList.add("user-info"); //give the new div a class of "user-info"
    //populate the div with the folloing elements for figure, image and paragraphs
    //use the JSON data to grab the relevant properties for the 5 placeholders
    userDiv.innerHTML = ` 
        <figure><img alt="user avatar" src=${user.avatar_url}</figure>
        <div>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Bio:</strong> ${user.bio}</p>
            <p><strong>Location:</strong> ${user.location}</p>
            <p><strong>Number of pulic repos:</strong> ${user.public_repos}</p>
            </div>
    `;
    overviewDiv.append(userDiv); //append the div to the overview element
}
