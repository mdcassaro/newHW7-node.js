const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your GitHub username?"
      },
      {
        type: "input",
        name: "project",
        message: "What is your project's name?"
      },
      {
        type: "input",
        name: "username",
        message: "What is your gitHub username?"
      },
      {
        type: "input",
        name: "description",
        message: "Please write a short description of your project?"
      },
      {
        type: "input",
        name: "license",
        message: "What kind of license should your project have?"
      },
      {
        type: "input",
        name: "repo",
        message: "What does the user need to know about using your repo?"
      },
      {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?"
      }
    ]).then(function(data) {

        var filename = "README.md";
      
        fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {
      
          if (err) {
            return console.log(err);
          }
      
          console.log("Success!");
      
        });
  })  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios
    .get(queryUrl)
    .then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
    });
    })
  
});
};


// function writeToFile("README.md", Markdown) {
// }

async function init() {
    console.log("hi")
    try {
      const answers = await promptUser();
  
      const text = generateHTML(answers);
  
      await writeFileAsync("README.md", Markdown);
  
      console.log("Successfully wrote to README.md");
    } catch(err) {
      console.log(err);
    }

}

init();
