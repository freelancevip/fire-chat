import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '../pages/chat'
import SingUpPage from '../pages/signup'

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'register',
            component: SingUpPage
        },
        {
            path: '/chat',
            name: 'chat',
            component: Chat,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/signup',
            component: SingUpPage
        },
    ]
})

export default router