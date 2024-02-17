const fs = require('fs');
const { get } = require('https');
const inquirer = require('inquirer');

async function getUserInput() {
    try {

        const answers = await inquirer.prompt([

            {
                type: 'input',
                name: "name",
                message: "Enter your Name",
            },
            {
                type: "input",
                name: "location",
                message: 'Enter your location'
            },
            {
                type: "input",
                name: "bio",
                message: "Enter your bio",
            },
            {
                type: "input",
                name: "Linkedin",
                message: "Enter your LinkedIn URL",
            },
            {
                type: "input",
                name: "GitHub",
                message: "Enter your GitHub URL",
            }
        ]);
        return answers;
    } catch (error) {
        throw new Error('Error occured while getting user input: ', error);
    }
}

async function generateHTML(answers) {
    try {
        const htmlContent = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            padding: 20px;
        }

        h1,
        h2,
        p {
            margin-bottom: 10px;
        }

        .bio, 
        .location {
            font-style: italic;
        }

        .social-links {
            margin-top: 20px;
        }

        .social-links a {
            display: block;
            margin-bottom: 10px;
        }
    </style>
</head>


<body class="main">
    <h1>User Information</h1>
    <h2>Name: ${answers.name}</h2>
    <p class='location>Location: ${answers.location}</p>
    <p class='bio'>Bio: ${answers.bio}</p>
    <div class='social-links'>
        <a href="${answers.Linkedin}" target="_blank">LinkedIn: </a>
        <a href="${answers.GitHub}" target="_blank">GitHub: </a>
    </div>


</body>

</html>
        `;
        return htmlContent;
    } catch (error) {
        throw new Error('Error occured while generating html: ', error);
    }
}

async function writeToFile(htmlContent) {
    try {
        await fs.promises.writeFile('index.html', htmlContent);
        console.log('HTML file has been saved successully!')

    } catch (error) {
        console.log('Error occured: ', error);
    }
}

async function main() {
    try {
        const userInput = await getUserInput();
        const htmlContent = await generateHTML(userInput);
        const result = await writeToFile(htmlContent);
    } catch (error) {
        console.error(error.message);
    }
}

main();
