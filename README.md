# Analytics Dashboard

This project is a React-based analytics dashboard that displays ad campaign data. The dashboard includes a table that allows users to customize which columns of data are displayed and drag-and-drop column ordering.

## Technologies Used
* React.js
* TypeScript
* CSS

### Getting Started
To get started with this project, follow these steps:

Clone the repo: git clone https://github.com/your_username/your_project.git .

* Install dependencies: `yarn install`
* Run the app: `yarn start`

## Components

### ReportTable
The ReportTable component displays the ad campaign data in a table format. It receives two props:

reportData (array of objects): The data to display in the table.
selectedColumns (array of strings): The columns of data to display.

### SettingsModal
The SettingsModal component allows users to customize the table by selecting which columns to display and changing the order of columns. It receives three props:
selectedColumns (array of strings): The columns of data currently displayed in the table.
setSelectedColumns (function): A function to update the selectedColumns state.
reportData (array of objects): The data to display in the table.
toggleSettingsModal (function): A function to close the settings modal.

## Available Scripts
In the project directory, you can run:

yarn start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

yarn test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

