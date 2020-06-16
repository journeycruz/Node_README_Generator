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
        message: "What is the title of this project?",
        name: "title"
    }, {
        type: "input",
        message: "Enter a description",
        name: "description"
    }, {
        type: "input",
        message: "Enter a table of contents",
        name: "tableOfContents"
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
    .then((answers) => {
        const queryUrl = `https://api.github.com/users/${answers.username}`;

        axios.get(queryUrl).then(function (res) {
            const userEmail = res.data.email;
            const userAvi = res.data.avatar_url;

            let readMe = `# ${answers.title}

            ## Description 
            
            ${answers.description}    
            
            
            ## Table of Contents (Optional)
            
            ${answers.tableOfContents}
            
            * [Installation](#installation)
            * [Usage](#usage)
            * [Credits](#credits)
            * [License](#license)
            
            
            ## Installation
            
            ${answers.installation}
            
            
            ## Usage 
            
            ${answers.usage} 
            
            
            ## License
            
            ${answers.license}
        
            ## Badges
            
            
            ## Contributing
            
            ${answers.contributing}
            
            ## Tests
            
            ${answers.tests}
            
            ${userEmail}

            ${userAvi}
            `;
            fs.writeFile("README.md", readMe, (err) => {
                if (err) throw err;
                console.log("Successfully wrote to README.md!");
            });
        });
    })
    .catch(function (err) {
        console.log(err);
    });