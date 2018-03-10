<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-title>Fire Chat App</f7-nav-title>
        </f7-navbar>
        <f7-list>
            <f7-list-item title="Login" link="/login/"></f7-list-item>
            <f7-list-item title="Sign Up" link="/signup/"></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import {auth} from '../database'

    export default {
        name: 'home',
        methods: {
            logout() {
                auth.signOut()
                    .then(() => {
                        this.$f7router.navigate('/', {reloadAll: true});
                    });
            }
        }
    }
</script>
