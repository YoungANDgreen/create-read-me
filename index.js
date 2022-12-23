// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown.js');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What was your motivation?",
        name: 'Motivation',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Why did you build this project?",
        name: 'Why',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Input can not be blank.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What did you learn?",
        name: 'Lessons',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Input can not be blank.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What makes your project stand out?",
        name: 'Special',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Input can not be blank.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is your GitHub Username?",
        name: 'GitHub',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Input can not be blank.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "How do you install this application?",
        name: 'Install',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Input can not be blank.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is your email?",
        name: 'Email',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Input can not be blank.");
            }
            return true;
        }
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }, 
    {
        type: 'input',
        message: "What is the Title of your project?",
        name: 'Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Input can not be blank.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the link to your Github Repo?",
        name: 'Repo',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("Input can not be blank.");
            }
            return true;
        }
    },
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("ReadMe file generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
    try {

        const userResponses = await inquirer.prompt(questions);
        console.log(userResponses);
        console.log("Onto the next!");

    
        console.log("Creating file.")
        const markdown = generateMarkdown(userResponses);
        console.log(markdown);
    
        
        await writeFileAsync('MyfirstREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

// Function call to initialize app
init();
