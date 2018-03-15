<template>
    <div>
        <f7-messages>
            <my-message
                    v-for="(message, index) in messages"
                    :key="index"
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
                ref="messagebar"
                :attachmentsVisible="attachmentsVisible"
                :sheetVisible="sheetVisible"
                @submit="send"
        >
            <f7-link
                    icon-if-ios="f7:camera_fill"
                    icon-if-md="material:camera_alt"
                    slot="inner-start"
                    @click="sheetVisible = !sheetVisible"
            ></f7-link>
            <f7-link
                    icon-if-ios="f7:arrow_up_fill"
                    icon-if-md="material:send"
                    slot="inner-end"
                    @click="send"
            ></f7-link>
            <!-- Attachments -->
            <f7-messagebar-attachments>
                <f7-messagebar-attachment
                        v-for="(image, index) in attachments"
                        :key="index"
                        :image="image"
                        @attachment:delete="deleteAttachment(image)"
                ></f7-messagebar-attachment>
            </f7-messagebar-attachments>
            <!-- Sheet -->
            <f7-messagebar-sheet>
                <f7-messagebar-sheet-image
                        v-for="(image, index) in images"
                        :key="index"
                        :image="image"
                        :checked="attachments.indexOf(image) >= 0"
                        @change="handleAttachment"
                ></f7-messagebar-sheet-image>
            </f7-messagebar-sheet>
        </f7-messagebar>
    </div>
</template>

<script>
    import {db, auth} from '../database'
    import MyMessage from './my-message'

    export default {
        name: 'chat',
        components: {MyMessage},
        data() {
            return {
                attachments: [],
                sheetVisible: false,
                message: '',
                user: {
                    name: 'Guest',
                    avatar: ''
                },
                chatData: '',
                images: [
                    'https://loremflickr.com/320/240',
                    'https://loremflickr.com/200/300',
                    'https://loremflickr.com/400/300',
                    'https://loremflickr.com/300/150',
                    'https://loremflickr.com/150/300',
                    'https://loremflickr.com/300/300',
                    'https://loremflickr.com/300/300',
                    'https://loremflickr.com/200/300',
                    'https://loremflickr.com/400/300',
                    'https://loremflickr.com/300/150',
                ],
            }
        },
        firebase: {
            messages: db.ref('messages').limitToLast(300)
        },
        created() {
            let self = this;
            auth.onAuthStateChanged(user => {
                if (user) {
                    self.user = auth.currentUser;
                    self.chatData = JSON.parse(user.photoURL.replace('\"', '"'));
                }
            })
        },
        computed: {
            attachmentsVisible() {
                const self = this;
                return self.attachments.length > 0;
            },
            placeholder() {
                const self = this;
                return self.attachments.length > 0 ? 'Add comment or Send' : 'Message';
            },
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
            deleteAttachment(image) {
                const self = this;
                const index = self.attachments.indexOf(image);
                self.attachments.splice(index, 1)[0]; // eslint-disable-line
            },
            handleAttachment(e) {
                const self = this;
                const index = self.$$(e.target).parents('label.checkbox').index();
                const image = self.images[index];
                if (e.target.checked) {
                    // Add to attachments
                    self.attachments.unshift(image);
                } else {
                    // Remove from attachments
                    self.attachments.splice(self.attachments.indexOf(image), 1);
                }
            },
            sendMessage() {
                const self = this;
                const text = self.messagebar.getValue().replace(/\n/g, '<br>').trim();
                // the rest of logic to send a message
            },
            onF7Ready() {
                const self = this;
                self.messagebar = self.$f7.messagebar;
            },
        }
    }
</script>
