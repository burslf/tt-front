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
import { ref, onMounted, watch } from "vue";
// import { listUploads } from "./helpers/web3storage";
import { useCreatedTickets } from "./stores/createdTickets-store";
import { useScreenState } from "./stores/drawer-store";
// import { setCssVar } from "quasar";

const $q = useQuasar();
const visible = ref(true);
const showSimulatedReturnData = ref(false);

const { createdTickets, setCreatedTickets } = useCreatedTickets();
const { mobileState, setMobileState } = useScreenState();

$q.dark.set(true);

onMounted(() => {
  const w = $q.screen.width;
  if (w < 800) {
    setMobileState(true);
  } else {
    setMobileState(false);
  }
  watch(
    () => $q.screen.width,
    (w, oldW) => {
      if (w < 800) {
        setMobileState(true);
      } else {
        setMobileState(false);
      }
    }
  );
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
  const response = await fetch('https://dev-api.ticketrust.io/created-events/all')
  const createdEventsJson = await response.json()
  setCreatedTickets(createdEventsJson)
  console.log(createdEventsJson)
  
  const allCards = createdEventsJson.reduce(
    (obj, item) => Object.assign(obj, { [item['event_id']]: item }),
    {}
  );
  localStorage.setItem("cards", JSON.stringify(allCards));
}
</script>
