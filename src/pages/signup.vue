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
                <f7-button fill raised @click="signup">Sign Up</f7-button>
                <f7-link href="/login/">Login</f7-link>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import {auth} from "../database";

    export default {
        name: 'signup',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            signup() {
                let self = this;
                auth.createUserWithEmailAndPassword(this.email, this.password).catch((error) => alert(error));
            },
            logout() {
                auth.signOut()
                    .then(() => {
                        this.$f7router.navigate('/');
                    });
            }
        }
    }
</script>
