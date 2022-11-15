<template>
    <q-scroll-area class="fit">
        <q-list padding class="menu-list">
            <q-item active-class="active" :active="isActive == 'inbox'" clickable v-ripple
                @click="() => isActive = 'inbox'">
                <q-item-section avatar>
                    <q-icon name="monetization_on" />
                </q-item-section>

                <q-item-section>
                    Raise Capital
                </q-item-section>
            </q-item>

            <q-item active-class="active" :active="isActive == 'star'" clickable v-ripple
                @click="() => isActive = 'star'">
                <q-item-section avatar>
                    <q-icon name="explore" />
                </q-item-section>

                <q-item-section>
                    Explore
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