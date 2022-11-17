<template>
  <q-page class="flex column items-center">
    <h1 class="text-h4">Raise Capital</h1>
    <div class="row items-start" style="width: 100%">
      <div class="flex justify-center col-12 col-md-5">
        <div class="flex column" style="width: 70%">
          <q-file class="q-ma-sm" color="secondary"  clearable filled v-model="createEventForm.eventImage" label="Pick profile image"
          :rules="[val => !!val || 'Field is required']">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>
        </div>

      </div>

      <div class="flex justify-center col-12 col-md-7">
        <div class="flex column" style="width: 70%">
          <q-input color="secondary" class="q-ma-sm" filled v-model="createEventForm.eventName" label="Event Name" 
          :rules="[val => !!val || 'Field is required']"/>
          
            <q-input color="secondary" class="q-ma-sm" filled label="Date to countdown" v-model="createEventForm.eventDate">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="createEventForm.eventDate" mask="YYYY-MM-DD HH:mm">
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
                    <q-time v-model="createEventForm.eventDate" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          <div class="flex justify-between">
            <q-input color="secondary" class="q-ma-sm" style="width:45%" filled v-model="createEventForm.eventPrice" type="number" prefix="$" label="Event Price">
              <template v-slot:append>
                <q-avatar>
                  <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg">
                </q-avatar>
              </template>
            </q-input>
            <q-input color="secondary" class="q-ma-sm" style="width:45%" filled v-model="createEventForm.optionsFees" type="number" prefix="%" label="Options Fees (%)" />
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

<script setup lang="ts">
import {useCreateEventForm} from '../stores/createEventForm-store';
import { Web3Storage } from 'web3.storage';
import { useCreatedTickets } from '../stores/createdTickets-store';

const { createEventForm } = useCreateEventForm()
const { createdTickets } = useCreatedTickets()

const submitForm = async () => {
  console.log("Submitting...")
  
  const WEB3_STORAGE_API_TOKEN = process.env['WEB3_STORAGE_API_TOKEN']
  if (!WEB3_STORAGE_API_TOKEN){
    throw 'Missing WEB3 STORAGE API TOKEN'
  }
  const w3Client = new Web3Storage({ token: WEB3_STORAGE_API_TOKEN});

  const renamedFile = new File([createEventForm.value.eventImage], createdTickets.value.length.toString())

  const eventImageCID = await w3Client.put([renamedFile], {
    name: `image-${createdTickets.value.length}`,
    maxRetries: 3
  })

  const metadata = {
    image: eventImageCID,
    name: createEventForm.value.eventName,
  }

  const metadataJSON = new Blob([JSON.stringify(metadata)], {type:'application/json'})

  const fileObject = new File([metadataJSON], `${createdTickets.value.length}.json`)

  const offchainCID = await w3Client.put([fileObject], {name: `metadata-${createdTickets.value.length}`})

  console.log(offchainCID)
  
}

</script>
