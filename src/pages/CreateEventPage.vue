<template>
  <q-page class="flex column items-center">
    <h1 class="text-h4">Create an event</h1>
    <div class="q-mb-xl" style="max-width: 700px; width: 90%;">
      <q-stepper v-model="step" vertical color="accent" animated>
        <!-- STEP 1 -->
        <q-step :name="1" color="accent" title="Select event cover image" icon="settings" :done="step > 1">
          <!-- SELECT FILE -->
          <div class="flex column items-center">
            <div style="width: 90%; max-width: 700px">
              <q-file dense class="q-ma-sm" color="secondary" clearable filled v-model="createEventForm.eventImage"
                label="Import" :rules="[val => !!val || 'Field is required']"
                @update:model-value="updateFile()">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
              <div  v-if="imageUrl.length > 0" style="height: 300px; width: 100%;" class="flex justify-center">
                <img
                  :src="imageUrl"
                  spinner-color="white"
                  style="height: 100%; object-fit: contain;"
                />
              </div>
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn @click="step = 2" color="accent" label="Continue" />
          </q-stepper-navigation>
        </q-step>

        <!--  STEP 2 -->
        <q-step :name="2" color="accent" title="Fill rest of required informations" icon="create_new_folder"
          :done="step > 2">
          <!-- SELECT REST INPUT -->
          <q-input dense color="accent" class="q-ma-sm" filled v-model="createEventForm.eventName" label="Event Name"
            :rules="[val => !!val || 'Field is required']" />

          <q-input dense color="accent" class="q-ma-sm" filled label="Date to countdown"
            v-model="createEventForm.eventDate">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="createEventForm.eventDate" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="accent" flat />
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
                      <q-btn v-close-popup label="Close" color="accent" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="flex justify-between">
            <q-input dense color="secondary" class="q-ma-sm price-fees-input" style="width:45%" filled
              v-model="createEventForm.eventPrice" type="number" prefix="$" label="Event Price">
              <template v-slot:append>
                <q-avatar>
                  <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg">
                </q-avatar>
              </template>
            </q-input>
            <q-input dense color="secondary" class="q-ma-sm price-fees-input" style="width:45%" filled
              v-model="createEventForm.optionsFees" type="number" prefix="%" label="Options Fees (%)" />
          </div>
          <div class="flex justify-between items-center">
            <div class="q-ma-sm">
              <span class="text-h6">Grey Market Allowed</span>
            </div>
            <q-toggle v-model="createEventForm.greyMarketAllowed" color="accent" keep-color size="60px" />
          </div>

          <q-input dense color="secondary" type="number" class="q-ma-sm" filled v-model="createEventForm.ticketsTotal"
            label="Event Total Tickets" :rules="[val => !!val || 'Field is required']" />

          <q-stepper-navigation>
            <q-btn @click="step = 3" color="accent" label="Continue" />
            <q-btn flat @click="step = 1" color="accent" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="3" color="accent" title="Add payees and split shares !" icon="add_comment">

          <div class="flex column items-center">
            <SplitShareInput />
          </div>

          <q-stepper-navigation>
            <q-btn class="q-ma-sm self-center" style="width: 150px" push no-caps color="secondary" label="Submit"
              icon="wallet" @click="() => submitForm()" />
            <q-btn flat @click="step = 2" color="accent" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>


  </q-page>
</template>

<script setup lang="ts">
import { useCreateEventForm } from '../stores/createEventForm-store';
import { Web3Storage } from 'web3.storage';
import { useCreatedTickets } from '../stores/createdTickets-store';
import { BilleterieInstance } from '@burslf/tt-contracts';
import { ContractInfo, CreateEventParams } from '@burslf/tt-contracts/dist/types';
import { billeterieAddress } from '../contracts/contractAddress';
import { billeterieABI } from '../contracts/contractABI';
import { useSignerStore, useWalletStore } from '../stores/wallet-store';
import SplitShareInput from '../components/inputs/SplitShareInput.vue';
import { toRaw, ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { triggerBackendMonitor } from '../services/triggerMonitor';

const step = ref(1);

const $q = useQuasar()
const imageUrl = ref('');

const { signerState } = useSignerStore()
const { createEventForm } = useCreateEventForm()
const {wallet} = useWalletStore()

onMounted(() => {
  if (!signerState.value) useRouter().push('/')
})

const submitForm = async () => {
  $q.loading.show({
    message: 'Submitting metadata to IPFS'
  })
  if (!createEventForm.value.eventImage) {
    $q.loading.hide()
    $q.notify({ color: 'negative', message: 'Missing image' })
    throw 'Missing image'
  }

  try {
    if (!signerState.value) {
      $q.loading.hide()
      $q.notify({ color: 'negative', message: 'No signer found for calling the contract function' })
      throw 'No signer found for calling the contract function'
    }
    const contractInfo: ContractInfo = {
      address: billeterieAddress,
      abi: billeterieABI,
      signer: toRaw(signerState.value)
    }

    const billeterieInstance = new BilleterieInstance(contractInfo)

    const totalTickets = await billeterieInstance.contract.functions['totalEvents']()
    console.log("TOTAL TICKETS: ", totalTickets)
    const metadataCID = await addMetadataToIPFS(createEventForm.value.eventImage, totalTickets)
    $q.loading.hide()
    $q.loading.show({
      message: 'Calling contract...'
    })


    if (!createEventForm.value.shares || !createEventForm.value.ticketsTotal || !createEventForm.value.eventPrice || !createEventForm.value.eventDate) {
      $q.loading.hide()
      $q.notify({ message: 'Missing shares' })
      throw 'Missing shares'
    }
    const parsedDate = new Date(createEventForm.value.eventDate)
    const dateToTimestamp = parsedDate.getTime() / 1000

    const createEventParams: CreateEventParams = {
      greyMarketAllowed: createEventForm.value.greyMarketAllowed,
      offchainData: metadataCID,
      optionFees: Number(createEventForm.value.optionsFees),
      payees: createEventForm.value.payees,
      shares: createEventForm.value.shares,
      supplyPriceDate: [createEventForm.value.ticketsTotal, createEventForm.value.eventPrice, dateToTimestamp]
    }
    try {
      console.log(createEventParams)
      const result: TransactionResponse = await billeterieInstance.createEvent(createEventParams)
      $q.loading.hide()
      $q.loading.show({message: 'Waiting for 2 confirmation block...'})

      const receipt = await result.wait(2)
      console.log(receipt)

      await triggerBackendMonitor()

      $q.loading.hide()
      $q.notify({
        color: 'positive',
        message: `Tx completed: ${result.hash}`
      })
    } catch (e) {
      $q.loading.hide()
      $q.notify({ color: 'negative', message: JSON.stringify(e) })
    }

  } catch (e) {
    $q.loading.hide()
    $q.notify({ color: 'negative', message: JSON.stringify(e) })
  }

}

const addMetadataToIPFS = async (image: File, eventId: number) => {
  const WEB3_STORAGE_API_TOKEN = process.env['VUE_APP_WEB3_STORAGE_API_TOKEN']
  if (!WEB3_STORAGE_API_TOKEN) {
    throw 'Missing WEB3 STORAGE API TOKEN'
  }
  const w3Client = new Web3Storage({ token: WEB3_STORAGE_API_TOKEN });

  const renamedFile = new File([image], eventId.toString())

  const eventImageCID = await w3Client.put([renamedFile], {
    name: `image-${eventId}`,
    maxRetries: 3
  })

  const metadata = {
    image: eventImageCID,
    name: createEventForm.value.eventName,
  }
  const metadataJSON = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  const fileObject = new File([metadataJSON], `${eventId}.json`)

  const offchainCID = await w3Client.put([fileObject], { name: `metadata-${eventId}` })

  return offchainCID
}

const updateFile = () => {
    imageUrl.value = createEventForm.value.eventImage ? URL.createObjectURL(createEventForm.value.eventImage) : ''
}

</script>

<style lang="scss">
@media only screen and (max-width: 750px) {
  .price-fees-input {
    width: 100% !important;
  }
}
</style>