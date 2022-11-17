<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-center">Explore</h1>
    <div class="q-pa-md">
      <q-infinite-scroll class="flex justify-center" style="width: 100%" @load="onLoad" :offset="250">
        <div class="flex justify-around wrap">
          <CreatedTicketCard v-for="(card, index) in paginateCards" :key="index"
            @click="() => navigateToProject(card, index)" v-bind="card"/>
        </div>

        <template v-if="moreToLoad" v-slot:loading>
          <div class="flex justify-center q-my-md">
            <q-spinner-dots color="accent" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>

    </div>


  </q-page>
</template>

<script setup>
import CreatedTicketCard from '../components/CreatedTicketCard.vue';
import { useCreatedTickets } from '../stores/createdTickets-store';
import { useRouter } from 'vue-router';

import { ref } from 'vue';

const { createdTickets } = useCreatedTickets()

const cardsCount = ref(10)
const router = useRouter()
const moreToLoad = ref(false);

const paginateCards = ref([...createdTickets.value.slice(0, cardsCount.value)]);
const cardsToStore = paginateCards.value.reduce(
  (obj, item, i) => Object.assign(obj, { [i]: item }), {});

localStorage.setItem('cards', JSON.stringify(cardsToStore))

function onLoad(index, done) {
  if (paginateCards.value.length != createdTickets.value.length) {
    moreToLoad.value = true
    const nextCardsToLoad = createdTickets.value.slice(cardsCount.value, cardsCount.value + 10)

    setTimeout(() => {
      for (let card of nextCardsToLoad) {
        paginateCards.value.push(card)
      }
      const cardsToStore = paginateCards.value.reduce(
        (obj, item, i) => Object.assign(obj, { [i]: item }), {});

      localStorage.setItem('cards', JSON.stringify(cardsToStore))
      cardsCount.value += 10
      done()
    }, 2000)
  } else {
    moreToLoad.value = false
  }

}

function navigateToProject(card, index) {
  router.push({ path: `/event/${index}-${card.tx_hash}` })
}

</script>
