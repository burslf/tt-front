<template>
  <div class="q-pa-md row q-gutter-md">
    <q-card class="my-card cursor-pointer">
      <q-img :src="props.offchain_data.image" style="height: 210px">
        <div class="absolute-bottom flex items-center justify-between">
          <span class="text-h6">{{ props.offchain_data.name }}</span>
          <!-- <span class="text-subtitle2">Reward: {{ props.percentage }}%</span> -->
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
            :value="tickets_left / tickets_total"
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
import {OffchainData} from '../interfaces';
import {timestampToDate} from '../helpers/web3helpers';

const props = defineProps<{
  id: number,
  tx_hash: string,
  event_id: number,
  creator: string,
  tickets_total: number,
  tickets_left: number,
  event_date: string,
  options_fees: number,
  offchain_data: OffchainData,
  shares: [],
  grey_market_allowed: boolean
}>();

</script>

<style lang="scss">
.my-card {
  min-width: 220px;
  max-height: 420px;
}
</style>
