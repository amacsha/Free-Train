# Free Train

Free Train is an innovative web application tailored for parkour enthusiasts, enabling users to explore, upload, and view training locations. It provides a platform for users to contribute new spots by adding locations and sharing photos, enriching the community's knowledge base. The app includes a "like" feature for users to save and highlight their preferred locations, fostering a sense of discovery and personalization.

A unique "beacon" feature elevates community interaction by allowing users to activate a beacon on specific spots, signaling an open invitation for others to join in or take on challenges at those locations. This encourages real-time engagement and collaboration, making Free Train not just a resource for finding parkour spots but also a hub for community-driven events and challenges. Through these features, Free Train connects parkour practitioners worldwide, promoting shared experiences and the growth of the sport.

Frontend
- Vite with React, Typescript, Socket.IO
- Cypress and Vitest 
Backend
- Express, MongoDB, Mongoose ORM
- Supertest with Jest




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
- socket.io (two way connections)
- setup .env with VITE_CLOUDINARYNAME variable in the client folder. This variable should be your Cloud name from cloudinary. Either signup or go to your dashboard to find the name. You will also need to ensure it is set to an unsigned url. Go to settings and the Upload area. Enable unsigned uploading. Click upload preset and add a new upload preset called 'default' ensuring that the signing mode has been turned to unsigned.
- To test with cypress run 'npm run cypress:open' and follow the instructions.
- To test with vitest run 'npm run test'

### back end

- Express (general framework)
- Express file upload (file upload)
- Express session (authentication)
- mongoose and mongoDB (database and access)
- Bcrypt (password hashing)
- Set the test script if on mac to: "ENV=test mocha './dist/test/server.test.js'" and on Windows: "ENV=test && mocha './dist/test/server.test.js'". Also ensure you have uploads folders on both
