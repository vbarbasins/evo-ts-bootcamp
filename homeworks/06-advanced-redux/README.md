# Homework 06-advanced-redux

Project to show how to use redux with middlewares to collect info what happens on pizza site. For that integrated [redux](https://react-redux.js.org/introduction/getting-started) and [redux-thunk](https://github.com/reduxjs/redux-thunk)

Information available in redux dev tools. \ 
Additional middleware sending logs to `http://localhost:3001/log`.

---
How to run echo-server. Go to `echo-server` folder. Install package:
```
npm install
```
Run server:
```
ts-node ./server.ts
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
