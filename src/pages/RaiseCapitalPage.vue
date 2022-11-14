<template>
  <q-page class="flex column items-center">
    <h1 class="text-h4">Raise Capital</h1>
    <div class="row items-start" style="width: 100%">
      <div class="flex justify-center col-12 col-md-5">
        <div class="flex column" style="width: 70%">
          <q-file class="q-ma-sm" color="secondary"  clearable filled v-model="raiseCapitalForm.artistProfileFile" label="Pick profile image"
          :rules="[val => !!val || 'Field is required']">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <q-file class="q-ma-sm" color="secondary" clearable filled v-model="raiseCapitalForm.albumFile" label="Pick album image">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        </div>

      </div>

      <div class="flex justify-center col-12 col-md-7">
        <div class="flex column" style="width: 70%">
          <q-input color="secondary" class="q-ma-sm" filled v-model="raiseCapitalForm.artistName" label="Artist Name" 
          :rules="[val => !!val || 'Field is required']"/>
          <q-input color="secondary" class="q-ma-sm" filled v-model="raiseCapitalForm.artName" label="Art Name" />
          
            <q-input color="secondary" class="q-ma-sm" filled label="Date to countdown" v-model="raiseCapitalForm.dateCountdown">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="raiseCapitalForm.dateCountdown" mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="raiseCapitalForm.dateCountdown" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          <div class="flex justify-between">
            <q-input color="secondary" class="q-ma-sm" style="width:45%" filled v-model="raiseCapitalForm.amount" type="number" prefix="$" label="Amount Seeking">
              <template v-slot:append>
                <q-avatar>
                  <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg">
                </q-avatar>
              </template>
            </q-input>
            <q-input color="secondary" class="q-ma-sm" style="width:45%" filled v-model="raiseCapitalForm.percentage" type="number" prefix="%" label="% willing to give out" />
          </div>
          <q-btn
            class="q-ma-sm self-center"
            style="width: 150px"
            push
            no-caps
            color="secondary"
            label="Submit"
            icon="wallet"
            @click="() => submitForm()"
          />
        </div>
      </div>
    </div>


</q-page>
</template>

<script setup>
import {useRaiseCapitalStore} from '../stores/raiseCapital-store';
import { Web3Storage } from 'web3.storage';
import {prefix, suffix} from '../helpers/web3storage';
import { useExploreState } from 'src/stores/explore-store';

const {raiseCapitalForm} = useRaiseCapitalStore()
const { exploreCards, setExploreCards } = useExploreState()

const submitForm = async () => {
  console.log("Submitting...")

  const w3Client = new Web3Storage({ token: process.env['WEB3_STORAGE_API_TOKEN'] });

  const artistPicCID = await w3Client.put([raiseCapitalForm.value.artistProfileFile], {
    name:'artistPic',
    maxRetries: 3
  })

  const albumPicCID = await w3Client.put([raiseCapitalForm.value.albumFile], {
    name:'albumPic',
    maxRetries: 3
  })
  
  const payload = {
    artistProfileFile: artistPicCID,
    albumFile: albumPicCID,
    artistName: raiseCapitalForm.value.artistName,
    artName: raiseCapitalForm.value.artName,
    dateCountdown: raiseCapitalForm.value.dateCountdown,
    amount: raiseCapitalForm.value.amount,
    percentage: raiseCapitalForm.value.percentage
  }

  const parsedProject = new Blob([JSON.stringify(payload)], {type:'application/json'})

  const fileObject = new File([parsedProject], `project-${raiseCapitalForm.value.artistName}-${raiseCapitalForm.value.artName}.json`)

  await w3Client.put([fileObject], {name: `project-${raiseCapitalForm.value.artistName}-${raiseCapitalForm.value.artName}`})
  
  const newProjectToAdd = {
    ...payload, 
    artistProfileFile: `${prefix}${artistPicCID}${suffix}${raiseCapitalForm.value.artistProfileFile.name}`,
    albumFile: `${prefix}${albumPicCID}${suffix}${raiseCapitalForm.value.albumFile.name}`,
  }
  
  console.log(newProjectToAdd)

  setExploreCards([...exploreCards.value, newProjectToAdd])
}


</script>
