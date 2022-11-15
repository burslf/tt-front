<template>
  <q-page class="flex row">
    <div class="q-px-lg q-pt-xl col-12 col-md-6">
      <p class="text-h3 text-center">The Future of Live Events</p>
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
        v-if="exploreCards.length > 0"
        class="flex items-start justify-around q-pa-sm"
      >
        <RaiseCapitalCard
          v-for="(card, index) in cardsToDisplay"
          :key="index"
          @click="() => navigateToProject(card, index)"
          :artist-profile-file="card.artistProfileFile"
          :album-file="card.albumFile"
          :art-name="card.artName"
          :date-countdown="card.dateCountdown"
          :artist-name="card.artistName"
          :amount="card.amount"
          :percentage="card.percentage"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import RaiseCapitalCard from "src/components/RaiseCapitalCard.vue";
import { useRouter } from "vue-router";
import { useExploreState } from "../stores/explore-store";

import { computed, ref } from "vue";

const { exploreCards, setExploreCards } = useExploreState();

const router = useRouter();

const cardsToDisplay = computed(() => {
  if (exploreCards.value.length == 1) {
    return [exploreCards.value[0]];
  } else if (exploreCards.value.length > 1) {
    return [exploreCards.value[0], exploreCards.value[1]];
  } else {
    return null;
  }
});

function navigateToProject(card, index) {
  router.push({ path: `/project/${index}-${card.artName}` });
}
</script>
