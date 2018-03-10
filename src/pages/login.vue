<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-title>Fire Chat App</f7-nav-title>
        </f7-navbar>
        <f7-list form>
            <f7-list-item>
                <f7-label>Username</f7-label>
                <f7-input
                        name="email"
                        placeholder="Email"
                        type="email"
                        :value="email"
                        @input="email = $event.target.value"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Password</f7-label>
                <f7-input
                        name="password"
                        type="password"
                        placeholder="Password"
                        :value="password"
                        @input="password = $event.target.value"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-button fill raised @click="login">Login</f7-button>
                <f7-link href="/signup/">Sign Up</f7-link>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import {auth} from "../database";

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                let self = this;
                auth.signInWithEmailAndPassword(self.email, self.password).catch((error) => alert(error));
            }
        }
    }
</script>
