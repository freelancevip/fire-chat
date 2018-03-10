// Import Vue
import Vue from 'vue';
import VueFire from 'vuefire'
// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app';
import {auth} from "./database";

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7);

Vue.config.productionTip = false;
Vue.use(VueFire);

let vm = new Vue({
    el: '#app',
    template: '<app/>',
    framework7: {
        id: 'io.framework7.testapp',
        name: 'Framework7',
        theme: 'ios',
        routes: Routes
    },
    components: {
        app: App
    },
    methods: {
        onF7Ready($f7) {
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    $f7.router.navigate('/chat/', {reloadAll : true, animate: false});
                } else {
                    $f7.router.navigate('/', {reloadAll: true, animate: false});
                }
            });
        }
    }
});


