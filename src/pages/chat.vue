<template>
    <f7-page>
        <f7-navbar title="Chat now">
            <f7-nav-right>
                <f7-link title="Exit" @click="logout">Exit</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block strong>
            <f7-messages>
                <f7-message
                        v-for="message of messages"
                        :key="message['.key']"
                        :tail="true"
                        :type="messageClass(message)">
                    <div slot="bubble-start" v-html="message.text"></div>
                </f7-message>
            </f7-messages>
            <f7-messagebar
                    placeholder="Message"
                    send-link=""
                    @submit="send"
            >
                <f7-link
                        icon-if-ios="f7:arrow_up_fill"
                        icon-if-md="material:send"
                        slot="inner-end"
                        @click="send"
                ></f7-link>
            </f7-messagebar>
        </f7-block>
    </f7-page>
</template>

<script>
    import {db, auth} from '../database'

    export default {
        name: 'chat',
        data() {
            return {
                message: ''
            }
        },
        firebase: {
            messages: db.ref('messages').limitToLast(25)
        },
        methods: {
            send() {
                if (!auth.currentUser || text === '') return;
                const self = this;
                const text = self.$f7.messagebar.getValue().replace(/\n/g, '<br>').trim();
                db.ref('messages').push({
                    senderId: auth.currentUser.uid,
                    text: text,
                    timestamp: +new Date()
                });
                self.$f7.messagebar.clear();
            },
            messageClass(message) {
                if (message.senderId === auth.currentUser.uid) {
                    return 'sent';
                } else {
                    return 'received'
                }
            },
            onF7Ready($f7) {
                if (auth.currentUser === null) {
                    $f7.router.navigate('/', {reloadCurrent: true, animate: false});
                }
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
