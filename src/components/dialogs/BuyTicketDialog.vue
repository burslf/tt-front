<template>
    <q-dialog v-model="buyTicketDialog">
        <q-card style="width: 350px" class="justify-center items-center flex column">
            <q-toolbar style="height: 100px; width: 100%;" class="flex column items-center justify-between q-pa-md">
                <div class="flex justify-between" style="width: 100%;">
                    <q-toolbar-title shrink>
                        <span class="text-weight-bold">{{props.eventName}}</span>
                    </q-toolbar-title>
                    <q-btn flat round dense icon="close" v-close-popup />
                </div>
                <div class="flex justify-center items-center" style="width: 100%;">
                    <span class="text-subtitle1 q-mr-md"> Tickets Left:  </span> 
                    <span class="text-h6 text-bold"> {{props.ticketsLeft}} / {{props.ticketsTotal}} </span> 
                    
                </div>
            </q-toolbar>

            <div style="width: 80%; height: 100%; max-width: 600px;">
                <q-input dense color="secondary" class="q-ma-sm" filled v-model="buyTicketForm.amount"
                    label="Amount" :rules="[val => val <= props.ticketsLeft || 'Not enough tickets']" />
                
                    <q-input dense color="secondary" class="q-ma-sm" filled v-model="buyTicketForm.recipient"
                    label="Recipient Address" :rules="[val => !!val || 'Cannot be empty']" />
                
            </div>

            <q-card-section style="height: 80px;" class="menu-btn row items-center justify-center">
                <q-btn class="q-mx-xs" color="secondary" @click="() => buyTicket()" icon="local_activity" label="Buy Tickets" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBuyTicketForm } from '../../stores/buyTicketForm-store';
import { useBuyTicketDialogState } from "../../stores/dialog-store";
import { useWalletStore } from '../../stores/wallet-store';

const props = defineProps<{
    eventName: string,
    ticketsLeft: number,
    ticketsTotal: number
}>()

const { buyTicketForm, setBuyTicketForm } = useBuyTicketForm()
const { buyTicketDialog } = useBuyTicketDialogState()

const {wallet} = useWalletStore()

onMounted(() => {
    if (wallet.value.address) {
        buyTicketForm.value.recipient = wallet.value.address
    }
})

const buyTicket = async () => {
    console.log("TO Implement")
}
</script>