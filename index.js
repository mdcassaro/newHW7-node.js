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
        name: "title",
        message: "What is your project's name?"
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
    ]);
    //.then(function(data) {

        // var filename = "README.md";
      
        // fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {
      
        //   if (err) {
        //     return console.log(err);
        //   }
      
          // console.log("Success!");
      
        // });
 // })  
    
}

function generateMarkdown(data, gh) {
    return `
  # ${data.title}
  # ${data.name}
  # ${data.description}
  # ${data.license}
  # ${data.repo}
  # ${data.contributing}
  # ${data.email}
  
  
  `;
  //console.log(data)
  }

//TODO Create a function that creates an axios call to github api

function uploadGithub(username){
  const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
  axios.get(queryUrl).then(function(res) {
    const repoNames = res.data.map(function(repo) {
      return repo.name;
    });

    const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  };




async function init() {
    console.log("hi")
    try {
      const answers = await promptUser();
      console.log("answers variable " + answers.title);

     //TODO create another async variable equal to the axios call function
        //pass in user's github info from answers.email(?)
        //

      const markdown = generateMarkdown(answers, github);
      console.log(" markdown object inside init " + markdown);


      await writeFileAsync("README.md", markdown);
  
      console.log("Successfully wrote to README.md");
    } catch(err) {
      console.log(err);
    }

}

init();
