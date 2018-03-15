<template>
    <f7-page>
        <f7-navbar title="Right Panel" sliding></f7-navbar>
        <f7-block>
            <p>Right panel content goes here</p>
        </f7-block>
        <f7-block-title>Load page in panel</f7-block-title>
        <f7-list>
            <f7-list-item link="/channels/" title="Каналы"></f7-list-item>
            <f7-list-item link="/form/" title="Form"></f7-list-item>
        </f7-list>
        <f7-block-title>Load page in main view</f7-block-title>
        <f7-list>
            <f7-list-item link="/about/" title="About" view="#main-view" panel-close></f7-list-item>
            <f7-list-item title="Выход" @click="logout"></f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import {auth} from '../database'

    export default {
        methods: {
            logout() {
                auth.signOut()
                    .then(() => {
                        window.location.href = '/';
                    });
            }
        }
    }
</script>