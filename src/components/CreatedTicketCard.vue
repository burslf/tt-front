<template>
  <div class="q-pa-md row q-gutter-md">
    <q-card class="my-card cursor-pointer">
      <q-img :src="props.offchain_data.image" style="height: 210px">
        <div class="absolute-bottom flex items-center justify-between">
          <span class="text-h6">{{ props.offchain_data.name }}</span>
          <span class="text-h5 text-bold q-pa-sm" style="border: 1px solid;white"> {{ props.price }}$</span>
        </div>
      </q-img>

      <q-card-section class="bg-primary text-white">
        <div class="flex items-center justify-between q-pb-md">
          <q-avatar size="38px" color="accent">
            {{props.creator[props.creator.length - 1]}}
          </q-avatar>
          <div>
            <q-chip color="secondary">
                <span class="text-subtitle2">{{ concatAddress(props.creator) }}</span>
            </q-chip>          
          </div>
        </div>
        <div>
          <q-linear-progress
            stripe
            rounded
            size="20px"
            :value="1- tickets_left / tickets_total"
            color="secondary"
          />
        </div>
        <div class="q-py-md q-px-md flex column justify-between items-start">
          <span class="text-italic">Event date: {{ timestampToDate(props.event_date) }}</span>
          <div class="q-py-md ">
              <span></span>
              <span class="status text-weight-bold">
                {{ `Tickets Left: ${props.tickets_left}/${props.tickets_total}` }}
              </span>
          </div>

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { concatAddress } from '../helpers/web3helpers';
import { OffchainData} from '../interfaces';
import {timestampToDate} from '../helpers/web3helpers';

interface CreatedTickets {
    _id: string
    created_at: number
    updated_at: number | null
    tx_hash: string
    indexed_chain_event_id: string
    event_id: number
    creator: string
    tickets_total: number
    tickets_left: number
    price: string
    event_date: number
    options_fees: number
    offchain_data: OffchainData
    shares: [string[], number[]] | null
    grey_market_allowed: boolean
    network_id: string
}

const props = defineProps<CreatedTickets>();

</script>

<style lang="scss">
.my-card {
  min-width: 220px;
  max-height: 420px;
}
</style>
