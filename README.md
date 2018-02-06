Crews sales insights
This app provides a way to view sales data by different metrics and dimensions.

## Install
- Be sure to have nodejs and npm installed [nodejs.org](https://nodejs.org/en/)
- Run `npm install` to load all the required nodejs packages
- Run `npm install -g bower` to load bower
- Run `bower install` to load bower components

## Development
- Run `domo login` from from any location and login to your Domo instance
- Run `domo dev` from the src folder to test the dev version of the app using domo
- Run `npm start` from the root folder to test the src without domo (testing style, layout, etc.)

## Build
- Run `gulp build` to create a minified build in the build directory
- Run `domo dev` from the build folder to test the build version of the app
