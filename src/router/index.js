import PanelRightPage from '../pages/panel-right.vue';
import ChannelsPage from '../pages/channels';
import SingUpPage from '../pages/signup'
import Chat from '../pages/chat'
import {auth} from '../database'

export default [
    {
        path: '/',
        name: 'register',
        component: SingUpPage,
        async(routeTo, routeFrom, resolve, reject) {
            if (auth.currentUser) {
                resolve({component: Chat})
            }
        }
    },
    {
        path: '/panel-right/',
        component: PanelRightPage,
    },
    {
        path: '/channels/',
        component: ChannelsPage,
    },
    {
        path: '/chat/',
        component: Chat
    },
    {
        path: '/signup',
        component: SingUpPage
    },
];