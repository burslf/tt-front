<template>
  <q-page class="flex row">
      <div class="q-pa-lg col-xs-12 col-sm-7 col-md-7 col-lg-7">
          <div class="" style="max-width: 700px;">
              <q-img :ratio="1" :src="selectedProject.albumFile">
                  <div class="absolute-bottom text-subtitle1 text-center">
                      {{ selectedProject.artName }}
                  </div>
              </q-img>
          </div>
      </div>

      <div class="q-pa-lg q-my-lg col-xs-12 col-sm-4 col-md-5 col-lg-5 flex justify-center" style="max-height: 500px;">
          <div class="flex column" style="width: 80%">
              <div >
                  <div class="flex justify-between">
                      <div>
                          <span class="text-h4">{{ selectedProject.artName }}</span>
                      </div>
                      <q-chip color="primary">
                          <q-avatar>
                              <img :src="selectedProject.artistProfileFile" alt="">
                          </q-avatar>
                          <span class="text-subtitle2">{{ selectedProject.artistName }}</span>
                      </q-chip>
                  </div>
                  <div class="q-mt-xl">
                      <span class="text-subtitle1">Amount needed: <span class="text-h6">{{ selectedProject.amount }}$ </span> </span>
                  </div>
                  <div>
                      <span class="text-subtitle1">Royalty: <span class="text-h6">{{ selectedProject.percentage }}% </span> </span>
                  </div>
                  <div>
                      <span class="text-subtitle1">Ends on: <span class="text-h6">{{ selectedProject.dateCountdown }}</span> </span>
                  </div>
              </div>
              <div class="q-mt-xl">
                  <q-btn class="q-mr-sm q-mb-sm" label="Invest" color="secondary" />
                  <q-btn class="q-mr-sm q-mb-sm" label="Learn More" color="primary" />

              </div>
          </div>

      </div>

  </q-page>
</template>

<script setup>
import { useSelectedProject } from '../stores/selected-project';
import { useRoute } from 'vue-router';

const route = useRoute()
const { selectedProject, setSelectedProject } = useSelectedProject()

const cardId = route.params.idname.split('-')[0]
const cardsStorage = JSON.parse(localStorage.getItem('cards'))

setSelectedProject(cardsStorage[cardId])

</script>