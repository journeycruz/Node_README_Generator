const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const axios = require('axios')

function promptUser() {
    return inquirer.prompt({
        message: "Enter your GitHub username:",
        name: "username"
    })
    .then(function({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function(res) {
            const userEmail = res.data.map(function(email) {
                return email;
            })
        })
    })
}

inqPromise = promptUser()