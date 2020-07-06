# This repository is meant for VIACOM-18

Runs the app in the development mode.<br>
Open [http://localhost:7000](http://localhost:7000) to view it in the browser.


* It inlcudes 3 Input Fields

1. Entering gene symbol e.g. BRAF.
2. Entering position in a protein sequence e.g. 600.
3. Entering amino acid letter e.g. V

* Setup: Procedure:

* Checkout the master branch of the repository.
* Install the npm module required for the project.
* npm install

* In case of any concern, you can send your query to pushp.ranjansingh@gmail.com

# To install all modules
___
Run npm install

# On missing module dependencies
___

Run `npm install`

# To install nodemon plugin for development
___

# Please create blank .env file in the project root directory

Run `npm install -g nodemon`

# On developement machine:

Execute the following command to run the application (client + server)
`npm run dev`
___

Run below command to start only client:
`npm run start`
`client will run on the port 7000`

Run below command to start only server:
`npm run server`
`server will run on the port 5000`

On prod machine:
 Run the following command

`npm run prod`

# Server is created to handle the browser's CORS issue while making API calls for the HALAPLAY services


# Config changes
___

URL configs are available in

Config Folder: `server/config/url`

PROD config:
`server/config/url/prod.config.js`

DEV config:
`Create a .env file in the root directory of the project. Add environment-specific variables on new lines in the form of NAME=VALUE`
`Use PROD config mentioned above for reference or you can leave it blank for the time being if you do not have any hard core dependency` 

___


