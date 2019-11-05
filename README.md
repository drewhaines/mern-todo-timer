# The Todo Timer

### Overview

[The Todo Timer](https://mern-todo-timer.herokuapp.com) is a pomodoro timer with a todo list and user auth using passport and JWTs. It was created to increase productivity by identifying work that needs to get done with a todo list, then using the [pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) to accomplish it.

It was built using MongoDB, Express.js, React, Redux, and Node.js.


### Configuration
```
MongoDB 4.2.1
Express 4.17.1
React 16.11.0
Node.js 13.0.1
npm 6.12.0
yarn 1.17.3
```


### Getting Started

1. Clone The Todo Timer from [Github](https://github.com/drewhaines/mern-todo-timer) and cd into the project from the terminal.

2. Verify that Node.js and yarn are installed by running `node -v` and `yarn -v` in your terminal. If not installed, install them [Node.js](https://nodejs.org/en/download/) [Yarn](https://yarnpkg.com/lang/en/docs/install/).

3. Install [MongoDB](https://docs.mongodb.com/manual/installation/) and set up your preferred DB.

4. Run `npm install` or `yarn install`.

5. Create a file in `/config` called `keys.js`. It should export `mongoURI` and `secretOrKey`. Ask an existing developer if you need help or are unsure.

6. Run the app with the command `npm run dev`.

7. You're all set. You should be able to run the app locally!


### Deployment

Deployment is handled via Heroku. Just commit your changes, merge to master, and run `git push heroku master`.


### Contact Information

Creator: Drew Haines - drew@dmdevco.com
