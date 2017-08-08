# San Francisco Municipal Agency Vehicles Map UI
## Setup Guide

1. Install NodeJS

2. Navigate to the project inside the project folder (currently `sf-muni-app/`)

### Dev Environment

1. `npm start`
	* This will install all of the project dependencies, using npm and bower

2. `gulp`
	*  This will prepare the `dist` folder.
    * `dist/` contains single compiled css file which is minified, cleaned and revisioned
    * `dist/` contains single js file, which is revisioned
    * `dist/` contains the main `index.html` file with injected css and js files
    * `dist/` contains all other html files inside a single folder
    * `dist/` contains all the JSON files needed to create map
    * watches for any change in any css, js, html or JSON file representing map data

3. Open browser and type in `http://localhost:8004/#!/sfmuni` to run the app locally

### Production Environment

1. `npm run build`
    * Installs all the bower and npm packages and then creates `dist` folder
