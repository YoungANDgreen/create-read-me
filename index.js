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
    }
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
