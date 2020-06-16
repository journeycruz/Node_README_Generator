const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const axios = require('axios')

function promptUser() {
    return inquirer.prompt(
        {
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            type: "input"
        })
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