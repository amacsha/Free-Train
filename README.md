# Free Train

#### This project is like instagram for parkour, users can upload and view training locations.

#### Users have the ability to add locations and upload pictures for others to view.

#### They can save their locations using the like feature and are able to share challenges for others to complete.

![mapScreen](./readmeAssets/mapScreen.png)
![profileScreen](./readmeAssets/Profile.png)

## Getting started

1. This app requires a connection to mongo db. You must either install it or add an online connection. Once completed change the link in the db.js file
2. run npm i in the server folder then run nodemon index.js
3. run npm i in the client folder and then run npm run dev

## tech stack

### front end

- React (front end framework)
- Redux (state management)
- Leaflet and react Leaflet (maps)
- axios (server requests)

### back end

- Express (general framework)
- Express file upload (file upload)
- Express session (authentication)
- mongoose and mongoDB (database and access)
- Bcrypt (password hashing)
- Set the test script if on mac to: "ENV=test mocha './dist/test/server.test.js'" and on Windows: "ENV=test && mocha './dist/test/server.test.js'". Also ensure you have uploads folders on both 
