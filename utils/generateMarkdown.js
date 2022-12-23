// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(userResponses) {
  let markdown = 
   `
   ![GitHub repo language badge](https://img.shields.io/github/languages/top/${userResponses.GitHub}/${userResponses.Repo}?style=flat&logo=appveyor)
   * [License](#license)
   ${userResponses.license}

   # Table of Contents:

   * [Motivation]

   * [The Why]

   * [Lessons Learned]

   * [Why is it special?]
   
   - [What is this projects title?]
   ${userResponses.Title}
   - [Motivation for creating this app?]
  ${userResponses.Motivation}
  
  - [Why create this app?]
  ${userResponses.Why}

  - [Lessons learned creating this app?]
  ${userResponses.Lessons}

  - [What makes this project special?]
  ${userResponses.Special}

  - [Github Username]
  ${userResponses.GitHub}

  - [Repo link:]
  ${userResponses.Repo}

  - [License used]
  ${userResponses.license}

  
`;
return markdown;
}

module.exports = generateMarkdown;
