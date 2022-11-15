<template>
  <div v-show="showSimulatedReturnData" class="default-font">
    <router-view />
  </div>
  <q-inner-loading
    :showing="visible"
    label=""
    label-class="text-red default-font"
    size="5rem"
    color="primary"
    label-style="font-size: 1.2rem"
  />
</template>

<script setup lang="ts">
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { listUploads } from "./helpers/web3storage";
import { useExploreState } from "./stores/explore-store";
import { setCssVar } from "quasar";

const $q = useQuasar();
const visible = ref(true);
const showSimulatedReturnData = ref(false);

const { exploreCards, setExploreCards } = useExploreState();

$q.dark.set(true);

onMounted(() => {
  fetchCards()
    .then((r) => {
      visible.value = false;
      showSimulatedReturnData.value = true;
      AOS.init({
        duration: 700,
        easing: "ease-out",
      });
    })
  .catch((e) => console.log(e));
});

async function fetchCards() {
  // const exploreCards = await listUploads()
  // setExploreCards(exploreCards)
  const allCards = exploreCards.value.reduce(
    (obj, item, i) => Object.assign(obj, { [i]: item }),
    {}
  );
  localStorage.setItem("cards", JSON.stringify(allCards));
}
</script>
