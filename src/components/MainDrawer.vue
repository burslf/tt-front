<template>
    <!-- <q-scroll-area class="fit flex column"> -->
        <q-list padding class="flex column justify-center" style="height: 100%;">
            <router-link to="/create-event" style="text-decoration: none">
                <q-item active-class="active" :active="isActive == 'inbox'" clickable v-ripple
                    @click="() => isActive = 'inbox'">
                    <q-item-section avatar>
                        <q-icon name="monetization_on" />
                    </q-item-section>
    
                    <q-item-section>
                        Create Event
                    </q-item-section>
                </q-item>

            </router-link>
            <router-link to="/explore" style="text-decoration: none">
                <q-item active-class="active" :active="isActive == 'star'" clickable v-ripple
                    @click="() => isActive = 'star'">
                    <q-item-section avatar>
                        <q-icon name="explore" />
                    </q-item-section>
    
                    <q-item-section>
                        Explore
                    </q-item-section>
                </q-item>            
            </router-link>


        </q-list>
    <!-- </q-scroll-area> -->
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