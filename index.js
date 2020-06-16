const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const axios = require('axios')

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt(
        {
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            type: "input",
            message: "What is the title of this project?",
            name: "title"
        },
        {
            type: "input",
            message: "Enter a description",
            name: "description"
        },
        {
            type: "input",
            message: "Enter a table of contents",
            name: "tableOfContents"
        },
        {
            type: "input",
            message: "Does this project require installation of any third party tools? (i.e. inquirer, axios, etc...)",
            name: "installation"
        },
        {
            type: "input",
            message: "Provide instructions and examples for use",
            name: "usage"
        },
        {
            type: "list",
            message: "Select a license",
            choices: [
                "MIT", 
                "GNU GPLv3", 
                "Mozilla Public License 2.0", 
                "ApacheLicense2.0"
              ],
              name: "license"
        },
        {
            type: "input",
            message: "Enter guidelines for how other developers can edit this project",
            name: "contributing"
        },
        {
            type: "input",
            message: "Are there any tests that you would recommend for this project?",
            name: "tests"
        },
        {
            type: "input",
            message: "Are there any questions with this project?",
            name: "questions"
        }
        )
        .then(function ({ username }) {
            const queryUrl = `https://api.github.com/users/${username}`;

            axios.get(queryUrl).then(function (res) {
                console.log(res);
                console.log(res.data.avatar_url);
                console.log(res.data.email);
                const userEmail = res.data.email;
                const userAvi = res.data.avatar_url;
            })
        })
}

inqPromise = promptUser()
inqPromise.then(function(userInput) {
    let readMe = ``
})