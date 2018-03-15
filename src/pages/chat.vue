<template>
    <f7-page>
        <f7-navbar title="Chat now">
            <f7-nav-right>
                <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <chat></chat>
    </f7-page>
</template>

<script>
    import Chat from '../components/chat'

    export default {
        name: 'chat-page',
        components: {
            'chat': Chat
        }
    }
</script>
