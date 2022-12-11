<template>
  <q-page class="flex row justify-center">
    <div class="flex row">
      <div class="q-px-lg q-pt-xl col-12 col-md-6">
        <p class="text-h3">The Future of Live Events</p>
        <p class="text-subtitle1">
          An NFT event ticketing marketplace helping artists foster closer
          connections with fans, eliminating fraud and reducing the impact of
          scalping.
        </p>
        <p class="text-subtitle1">
          An NFT event ticketing marketplace helping artists foster closer
          connections with fans, eliminating fraud and reducing the impact of
          scalping.
        </p>
        <p class="text-subtitle1">
          An NFT event ticketing marketplace helping artists foster closer
          connections with fans, eliminating fraud and reducing the impact of
          scalping.
        </p>
        
        <div class="buttons">
          <q-btn
            class="q-mx-lg q-my-sm"
            push
            no-caps
            color="accent"
            label="Get Started"
          />
          <q-btn
            class="q-mx-lg q-my-sm"
            push
            no-caps
            color="secondary"
            label="Create"
          />
        </div>
      </div>
  
      <div class="flex col-12 col-md-6 justify-center">
        <div
          v-if="createdTickets.length > 0"
          class="flex items-start justify-around q-pa-sm"
        >
          <CreatedTicketCard
            v-for="(card, index) in cardsToDisplay"
            :key="index"
            @click="() => navigateToProject(card, index)"
            v-bind="card"
          />
        </div>
      </div>
    </div>

    <div class="flex row">
      <RoadmapComponent/>
    </div>
  </q-page>
</template>

<script setup>
import CreatedTicketCard from "src/components/CreatedTicketCard.vue";
import RoadmapComponent from "../components/RoadmapComponent.vue";

import { useRouter } from "vue-router";
import { useCreatedTickets } from "../stores/createdTickets-store";

import { computed } from "vue";

const { createdTickets } = useCreatedTickets();

const router = useRouter();

const cardsToDisplay = computed(() => {
  if (createdTickets.value.length == 1) {
    return [createdTickets.value[0]];
  } else if (createdTickets.value.length > 1) {
    return [createdTickets.value[0], createdTickets.value[1]];
  } else {
    return null;
  }
});

function navigateToProject(card, index) {
  router.push({ path: `/event/${card.event_id}-${card.tx_hash}` });
}
</script>
