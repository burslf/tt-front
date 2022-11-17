<template>
  <q-page class="flex row">
    <div class="q-pa-lg col-xs-12 col-sm-7 col-md-7 col-lg-7">
      <div class="q-pa-lg" style="max-width: 500px">
        <q-img :ratio="1" :src="selectedProject.offchain_data.image">
          <div class="absolute-bottom text-subtitle1 text-center">
            {{ selectedProject.offchain_data.name }}
          </div>
        </q-img>
      </div>
    </div>

    <div
      class="q-pa-lg q-my-lg col-xs-12 col-sm-4 col-md-5 col-lg-5 flex justify-center"
      style="max-height: 500px"
    >
      <div class="flex column" style="width: 80%">
        <div>
          <div class="flex column justify-between">
            <div>
              <span class="text-h4">{{ selectedProject.offchain_data.name }}</span>
            </div>
            <div class="flex items-center">
              <span>Creator: </span>
              <q-chip color="secondary">
                <span class="text-subtitle2">{{ concatAddress(selectedProject.creator) }}</span>
              </q-chip>
            </div>
          </div>
          <div class="q-mt-xl q-mb-md">
            <span class="text-subtitle1"
              >Ticket price:
              <span class="text-h6">{{ selectedProject.price }}$ </span>
            </span>
          </div>
          <div class="q-mb-md">
            <span class="text-subtitle1">
              Tickets Left:
              <span class="text-h6">{{ `${selectedProject.tickets_left}/${selectedProject.tickets_total}` }} </span>
            </span>
            <q-linear-progress
              stripe
              rounded
              size="20px"
              :value="selectedProject.tickets_left / selectedProject.tickets_total"
              color="secondary"
            />
          </div>
          <div>
            <span class="text-subtitle1"
              >Event Date:
              <span class="text-h6">{{ timestampToDate(selectedProject.event_date) }}</span>
            </span>
          </div>
        </div>
        <div class="q-mt-xl">
          <q-btn class="q-mr-sm q-mb-sm" label="Buy Ticket" color="secondary" />
          <q-btn class="q-mr-sm q-mb-sm" label="Learn More" color="primary" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useSelectedProject } from "../stores/selected-project";
import { useRoute } from "vue-router";
import { concatAddress, timestampToDate } from "../helpers/web3helpers";

const route = useRoute();
const { selectedProject, setSelectedProject } = useSelectedProject();

const cardId = route.params.idname.split("-")[0];
const cardsStorage = JSON.parse(localStorage.getItem("cards"));

setSelectedProject(cardsStorage[cardId]);
</script>
