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
import router from './router'
// Import App Component
import App from './app';
import {auth, db} from "./database";
import VueGoodWizard from 'vue-good-wizard';

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7);

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(VueGoodWizard);

// const EventBus = new Vue()
//
// Object.defineProperties(Vue.prototype, {
//     $bus: {
//         get: function () {
//             return EventBus
//         }
//     }
// })

window.EventBus = new Vue()

let vm = new Vue({
    el: '#app',
    template: '<app/>',
    framework7: {
        id: 'io.framework7.testapp',
        name: 'Framework7',
        theme: 'ios',
        // routes: Routes
    },
    router,
    components: {
        app: App
    },
    ready() {
        // auth.onAuthStateChanged((user) => {
        //     console.log(user)
        //     if (user) {
        //         this.$router.navigate('/chat/');
        //     } else {
        //         this.$router.navigate('/');
        //     }
        // });
    }
});

