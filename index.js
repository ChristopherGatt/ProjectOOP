const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const fs = require("fs");
const generateTeam = require("./src/html-creator.js");

const teamArr = [];

function appMenu() {
  function createManager() {
    // inquirer.prompt(manager info)
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the manager?",
        },
        {
          type: "input",
          name: "email",
          message: "What is the manager's email?",
        },

        {
          type: "input",
          name: "id",
          message: "What is the manager's id?",
        },
        {
          type: "input",
          name: "officeNumber",
          message: "What is the manager's office number?",
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.name,
          answers.email,
          answers.id,
          answers.officeNumber
        );
        teamArr.push(manager);
        addTeam();
      });

    //.then(instaniate a new Manager(name, id, email, officenum)
    //  teamArr.push(manager)
    // createTeam())
  }
  function addTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "userChoice",
          message: "What would you like to do next?",
          choices: ["add engineer", "add intern", "build team"],
        },
      ])
      .then((choice) => {
        switch (choice.userChoice) {
          case "add engineer":
            createEnginner();
            break;
          case "add intern":
            createIntern();
            break;
          default:
            buildTeam();
        }
      });
    //inquire prompt list switch case Engineer, case Intern, case no more memebers buildteam()
    //generate html
    //loop teamArr crating team card
  }

  function createEnginner() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the Engineer?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the Engineer's id??",
        },

        {
          type: "input",
          name: "email",
          message: "What is the Engineer's email?",
        },

        {
          type: "input",
          name: "github",
          message: "What is the Engineer's github username?",
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        teamArr.push(engineer);
        addTeam();
      });
  }

  function createIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the Intern?",
        },
        {
          type: "input",
          name: "id",
          message: "What is the Intern's id??",
        },

        {
          type: "input",
          name: "email",
          message: "What is the Intern's email?",
        },

        {
          type: "input",
          name: "school",
          message: "What school is the Intern attending?",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        teamArr.push(intern);
        addTeam();
      });
  }

  function buildTeam() {
    // generate HTML(teamArr) fs.writeFile -> dist/index.html
    console.log(teamArr);
    fs.writeFileSync("./dist/index.html", generateTeam(teamArr), "utf-8");
  }

  createManager();
}

appMenu();
