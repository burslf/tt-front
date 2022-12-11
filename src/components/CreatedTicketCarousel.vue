<template>
    <div class="q-pa-md">
        <q-carousel style="height: 100%" v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
            control-color="accent" navigation arrows height="300px"
            class="bg-primary shadow-2 rounded-borders">
            <q-carousel-slide :name="1" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                    <CreatedTicketCard class="flex justify-center rounded-borders col-3 " v-bind="props.cardsToDisplay[0]" />
                    <CreatedTicketCard class="flex justify-center rounded-borders col-3 " v-bind="props.cardsToDisplay[0]" />
                    <CreatedTicketCard class="flex justify-center rounded-borders col-3 " v-bind="props.cardsToDisplay[0]" />
                    <CreatedTicketCard class="flex justify-center rounded-borders col-3 " v-bind="props.cardsToDisplay[0]" />
                    
                    <!-- <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/mountains.jpg" />
                    <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" />
                    <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" /> -->
                    <!-- <q-img class="rounded-borders col-3 full-height" src="https://cdn.quasar.dev/img/parallax1.jpg" /> -->
                </div>
            </q-carousel-slide>
            <q-carousel-slide :name="2" class="column no-wrap">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                    <CreatedTicketCard class="flex justify-center rounded-borders col-3 " v-bind="props.cardsToDisplay[0]" />
                    <CreatedTicketCard class="flex justify-center rounded-borders col-3 " v-bind="props.cardsToDisplay[0]" />
                    <CreatedTicketCard class="flex justify-center rounded-borders col-3 " v-bind="props.cardsToDisplay[0]" />
                    <CreatedTicketCard class="flex justify-center rounded-borders col-3 " v-bind="props.cardsToDisplay[0]" />

                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script setup lang="ts">import { ref } from 'vue';
import { CreatedTickets } from '../interfaces';
import CreatedTicketCard from './CreatedTicketCard.vue';

const props = defineProps<{
    cardsToDisplay: CreatedTickets[]
}>()

const slide = ref(1)
</script>