const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios')

inquirer
    .prompt([{
        type: "input",
        message: "Enter your GitHub username:",
        name: "username"
    }, {
        type: "input",
        message: "What is the name of the associated Repository?",
        name: "repo",
    }, {
        type: "input",
        message: "What is the title of this project?",
        name: "title"
    }, {
        type: "input",
        message: "Enter a description",
        name: "description"
    }, {
        type: "checkbox",
        message: "Which sections would you like to include in your table of contents?",
        name: "tableOfContents",
        choices: ["Installation",
            "Usage",
            "Credits",
            "License"
        ]
    }, {
        type: "input",
        message: "Does this project require installation of any third party tools? (i.e. inquirer, axios, etc...)",
        name: "installation"
    }, {
        type: "input",
        message: "Provide instructions and examples for use",
        name: "usage"
    }, {
        type: "list",
        message: "Select a license",
        choices: [
            "MIT",
            "GNU GPLv3",
            "Mozilla Public License 2.0",
            "ApacheLicense2.0"
        ],
        name: "license"
    }, {
        type: "input",
        message: "Enter guidelines for how other developers can edit this project",
        name: "contributing"
    }, {
        type: "input",
        message: "Are there any tests that you would recommend for this project?",
        name: "tests"
    }, {
        type: "input",
        message: "Are there any questions with this project?",
        name: "questions"
    }])
    .then((userInput) => {
        const queryUrl = `https://api.github.com/users/${userInput.username}`;

        axios.get(queryUrl).then(function(res) {
            const userEmail = res.data.email;
            const userAvi = res.data.avatar_url;
            var license = "";
            if (`${userInput.license}` == "MIT") {
                var license = `MIT`
            } else if (`${userInput.license}` == "GNU GPLv3") {
                var license = `GNU GPLv3`

            } else if (`${userInput.license}` == "Mozilla Public License 2.0") {
                var license = `Mozilla Public License 2.0`

            } else if (`${userInput.license}` == "ApacheLicense2.0") {
                var license = `ApacheLicense2.0`
            }

            let readMe = `
# ${userInput.title}

## Description 
            
>${userInput.description}    
            
            
## Table of Contents (Optional)
${userInput.tableOfContents}
            
            
## Installation
            
${userInput.installation}
            
            
## Usage 
            
${userInput.usage} 
            
            
## License
            
${license}

## Badges

            
## Contributing
            
${userInput.contributing}
            
## Tests
            
${userInput.tests}

`;

            fs.writeFile("README.md", readMe, (err) => {
                if (err) throw err;
                console.log("Successfully wrote to README.md!");
            });
        });
    })
    .catch(function(err) {
        console.log(err);
    });