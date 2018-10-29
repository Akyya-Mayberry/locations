# Munchie Surf
This application displays a list of 5 liqour store locations in Haight Ashbury where you can get munchies/snacks.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). It uses [react-google-maps](https://github.com/tomchentw/react-google-maps) library for integrating with Google Maps, and [Yelp Fusion API](https://www.yelp.com/fusion) for retrieving details about store locations. To work solely client-side with Yelp Fusion API, a free web proxy located at 'https://cors-anywhere.herokuapp.com', is being used.

## Getting Started
The below instructions will walk you through setting up and running this application.

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.tsx` is the JavaScript entry point.

The application is written in Typescript and uses jsx, so various source files you will notice have a .tsx exetension to reflect this.

1. Clone the repository and change into it's directory
2. Grab the dependecies by running ```npm install```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
There is a known bug where after changes are made 'react-google-maps' library cannot be found. The solution is to stop the app and relaunch it.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Service Worker For Offline Access: 
*This application offers a limited offline experience by use of a service worker in both development and production. Both uses the service-worker-dev.js worker located in the public folder at the root of the project. To disable the worker, comment out the registration code in index.tsx. Alternatively, to run the service worker only in development or production make changes the registerServiceWorker.js file.*

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

This particular application is recommended to be used in Google Chrome.

## Contributing
Contributions are not being accepted at this time.
