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
import routes from './router'
import {auth} from './database'
// Import App Component
import App from './app';
import VueGoodWizard from 'vue-good-wizard';

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7);

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(VueGoodWizard);

// TODO: Add Event bus


auth.onAuthStateChanged(() => {
    if (typeof vm === 'undefined') {
        let vm = new Vue({
            el: '#app',
            template: '<app/>',
            framework7: {
                id: 'io.framework7.testapp',
                name: 'Framework7',
                theme: 'ios',
                routes
            },
            components: {
                app: App
            }
        });
        window.vm=vm;
    }
});