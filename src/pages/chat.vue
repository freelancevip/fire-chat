<template>
    <f7-page>
        <f7-navbar title="Chat now">
            <f7-nav-right>
                <f7-link title="Exit" @click="logout">Exit</f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block strong>
            <f7-messages>
                <my-message
                        v-for="message of messages"
                        :key="message['.key']"
                        :tail="true"
                        :avatar="message.data.avatar"
                        :name="message.data.name"
                        :name-color="message.data.colorScheme.color"
                        :background="message.data.colorScheme.background"
                        :bubble-color="message.data.colorScheme.border"
                        :type="messageClass(message)">
                    <div
                            slot="bubble-start"
                            v-html="message.text"></div>
                </my-message>
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
    import MyMessage from '../components/my-message'

    export default {
        name: 'chat',
        components: {MyMessage},
        data() {
            return {
                message: '',
                user: {
                    name: 'Guest',
                    avatar: ''
                },
                chatData: ''
            }
        },
        computed: {
            a() {
                return auth.currentUser
            }
        },
        firebase: {
            messages: db.ref('messages').limitToLast(25)
        },
        mounted() {
            let self = this;
            auth.onAuthStateChanged(user => {
                if (user) {
                    self.user = auth.currentUser;
                    self.chatData = JSON.parse(user.photoURL.replace('\"', '"'));
                }
            })
        },
        methods: {
            send() {
                if (!auth.currentUser) return;
                const self = this;
                const text = self.$f7.messagebar.getValue().replace(/\n/g, '<br>').trim();
                if (text === '') return;
                db.ref('messages').push({
                    senderId: this.user.uid,
                    text: text,
                    timestamp: +new Date(),
                    data: self.chatData
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
            logout() {
                let router = this.$router;
                auth.signOut()
                    .then(() => {
                        router.replace('/');
                    });
            }
        }
    }
</script>

<style>
    .message-image img {
        max-width: 100%;
    }

    .ios .message-avatar {
        width: 64px;
        height: 64px;
    }

    .message:not(.message-last) .message-avatar {
        opacity: 1 !important;
    }

    .message:not(.message-first) .message-name {
        display: block !important;
    }
</style>