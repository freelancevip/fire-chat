<template>
    <div class="message" :class="classes" @click="onClick">
        <!-- TODO: Customize component -->
        <slot name="start"></slot>
        <div class="message-avatar" v-if="avatar || $slots.avatar"
             :style="{'background-image': avatar && 'url(' + avatar + ')'}" @click="onAvatarClick"></div>
        <div class="message-content">
            <slot name="content-start"></slot>
            <div class="message-name" style="{ color: red }" v-if="name || $slots.name" @click="onNameClick">
                <slot name="name">{{name}}</slot>
            </div>
            <div class="message-header" v-if="header || $slots.header" @click="onHeaderClick">
                <slot name="header">{{header}}</slot>
            </div>
            <div class="message-bubble" @click="onBubbleClick">
                <slot name="bubble-start"></slot>
                <div class="message-image" v-if="image || $slots.image">
                    <slot name="image"><img :src="image"></slot>
                </div>
                <div class="message-text-header" v-if="textHeader || $slots['text-header']">
                    <slot name="text-header">{{textHeader}}</slot>
                </div>
                <div class="message-text" v-if="text || $slots.text" @click="onTextClick">
                    <slot name="text">{{text}}</slot>
                </div>
                <div class="message-text-footer" v-if="textFooter || $slots['text-footer']">
                    <slot name="text-footer">{{textFooter}}</slot>
                </div>
                <slot name="bubble-end"></slot>
                <slot></slot>
            </div>
            <div class="message-footer" v-if="footer || $slots.footer" @click="onFooterClick">
                <slot name="footer">{{footer}}</slot>
            </div>
            <slot name="content-end"></slot>
        </div>
        <slot name="end"></slot>
    </div>
</template>
<script>
    import message from '../../node_modules/framework7-vue/src/components/message'

    export default {
        name: 'myMessage',
        extends: message,
    };
</script>
