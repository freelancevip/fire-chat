import HomePage from './pages/home';
import LoginPage from './pages/login';
import SingUpPage from './pages/signup';
import ChatPage from './pages/chat';
import NotFoundPage from './pages/not-found';

import {auth} from './database'


let router = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/chat/',
        component: ChatPage
    },
    {
        path: '/login/',
        component: LoginPage,
        async(routeTo, routeFrom, resolve, reject) {
            if (auth.currentUser) {
                resolve({url: '/chat/'})
            }
        }
    },
    {
        path: '/signup/',
        component: SingUpPage
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default router