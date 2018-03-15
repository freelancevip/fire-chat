<template>
    <div class="message" :class="classes" @click="onClick">
        <!-- TODO: Customize component -->
        <slot name="start"></slot>
        <div class="message-avatar" v-if="avatar || $slots.avatar"
             :style="{'background-image': avatar && 'url(' + avatar + ')'}" @click="onAvatarClick"></div>
        <div class="message-content">
            <slot name="content-start"></slot>
            <div class="message-name" :style="{ color: nameColor }" v-if="name || $slots.name" @click="onNameClick">
                <slot name="name">{{name}}</slot>
            </div>
            <div class="message-header" v-if="header || $slots.header" @click="onHeaderClick">
                <slot name="header">{{header}}</slot>
            </div>
            <div class="message-bubble" :style="{'background-color' : background, color: bubbleColor}"
                 @click="onBubbleClick">
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
    import Utils from '../../node_modules/framework7-vue/src/utils/utils';
    import Mixins from '../../node_modules/framework7-vue/src/utils/mixins';
    import message from '../../node_modules/framework7-vue/src/components/message'

    const MessageProps = Utils.extend(
        {
            text: String,
            name: String,
            nameColor: String, //
            background: String, //
            bubbleColor: String, //
            avatar: String,
            type: {
                type: String,
                default: 'sent',
            },
            image: String,
            header: String,
            footer: String,
            textHeader: String,
            textFooter: String,
            first: Boolean,
            last: Boolean,
            tail: Boolean,
            sameName: Boolean,
            sameHeader: Boolean,
            sameFooter: Boolean,
            sameAvatar: Boolean,
        },
        Mixins.colorProps
    );
    export default {
        name: 'my-message',
        extends: message,
        props: MessageProps,
    };
</script>
<style>
    .message {
        max-width: 90%;
    }
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
	.toolbar.messagebar {
		position: fixed;
		bottom: 0;
	}
</style>