<template>
    <q-scroll-area class="fit">
        <q-list padding class="menu-list">
            <q-item active-class="active" :active="isActive == 'inbox'" clickable v-ripple
                @click="() => isActive = 'inbox'">
                <q-item-section avatar>
                    <q-icon name="inbox" />
                </q-item-section>

                <q-item-section>
                    Inbox
                </q-item-section>
            </q-item>

            <q-item active-class="active" :active="isActive == 'star'" clickable v-ripple
                @click="() => isActive = 'star'">
                <q-item-section avatar>
                    <q-icon name="star" />
                </q-item-section>

                <q-item-section>
                    Star
                </q-item-section>
            </q-item>

            <q-item active-class="active" :active="isActive == 'send'" clickable v-ripple
                @click="() => isActive = 'send'">
                <q-item-section avatar>
                    <q-icon name="send" />
                </q-item-section>

                <q-item-section>
                    Send
                </q-item-section>
            </q-item>

            <q-item active-class="active" :active="isActive == 'drafts'" clickable v-ripple
                @click="() => isActive = 'drafts'">
                <q-item-section avatar>
                    <q-icon name="drafts" />
                </q-item-section>

                <q-item-section>
                    Drafts
                </q-item-section>
            </q-item>
        </q-list>
    </q-scroll-area>
</template>

<script setup>
import { ref } from 'vue';

const isActive = ref("star")

</script>

<style lang="scss">
.active {
    background-color: $secondary;
}
</style>