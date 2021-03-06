# Framework7 Vue + Webpack App Template

Chat application based on [framework7-template-vue-webpack](https://github.com/framework7io/framework7-template-vue-webpack)

## Usage

### 1. Download this repository
```
git clone https://github.com/freelancevip/fire-chat my-app
```

Repository will be downloaded into `my-app/` folder

### 2. Instal dependencies

Go to the downloaded repository folder and run:
```
npm install
```

This will download latest version of Framework7, Framework7-Vue, Vue and required icon fonts (to `/src/fonts/`)

### 3. Fill firebase settings in src/database.js
~~~javascript
import {default as firebase, initializeApp} from 'firebase'

let config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

const app = initializeApp(config);

export const db = app.database();
export const auth = firebase.auth();
~~~

### 3. Run the app

```
npm run dev
```

App will be opened in browser at `http://localhost:8080/`

### 4. Build app for production

```
npm run build
```

The output will be at `www/` folder

## Use with cordova

Just put the contents of `www` folder in your cordova's project root `www` folder

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Project Structure

* `src/assets` - folder with static assets (images)
* `src/components` - folder with custom `.vue` components
* `src/css` - put custom app CSS styles here. Don't forget to import them in `main.js`
* `src/pages` - app `.vue` pages
* `src/main.js` - main app file where you include/import all required libs and init app
* `src/router/index.js` - app routes
* `src/app.vue` - main app structure/component
