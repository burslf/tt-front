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
import { onMounted, toRaw } from 'vue';
import { useBuyTicketForm } from '../../stores/buyTicketForm-store';
import { useBuyTicketDialogState } from "../../stores/dialog-store";
import { useSignerStore, useWalletStore } from '../../stores/wallet-store';
import { BilleterieInstance } from '@burslf/tt-contracts';
import { ContractInfo, MintTicketParams } from '@burslf/tt-contracts/dist/types';
import { QDialog, QCard, QToolbar, QToolbarTitle, QBtn, QInput, QCardSection, useQuasar } from 'quasar';
import { billeterieABI } from '../../contracts/contractABI';
import { billeterieAddress } from '../../contracts/contractAddress';
import { useRouter } from 'vue-router';
import { triggerBackendMonitor } from '../../services/triggerMonitor';

const props = defineProps<{
    eventName: string,
    ticketsLeft: number,
    ticketsTotal: number,
    eventId: number,
    creator: string,
    ticketPrice: string
}>()

const { buyTicketForm, setBuyTicketForm } = useBuyTicketForm()
const { buyTicketDialog } = useBuyTicketDialogState()

const {wallet} = useWalletStore()
const {signerState} = useSignerStore()

const $q = useQuasar()
const $router = useRouter()

onMounted(() => {
    console.log(props.ticketsLeft)
    if (wallet.value.address) {
        buyTicketForm.value.recipient = wallet.value.address
    }
})

const buyTicket = async () => {
    console.log(props.eventId)
    $q.loading.show()

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
    const mintTicketParams: MintTicketParams = {
        amount: buyTicketForm.value.amount,
        eventId: props.eventId,
        toAddress: buyTicketForm.value.recipient,
        data: "0x",
        value: Number(props.ticketPrice) * buyTicketForm.value.amount
    }
    console.log(mintTicketParams)
    try {
        const billeterieInstance = new BilleterieInstance(contractInfo)
        const callMint = await billeterieInstance.mintTicket(mintTicketParams)
        const receipt = await callMint.wait(1)
        console.log(receipt)
        await triggerBackendMonitor()

        $q.loading.hide()
        $q.notify({ color: 'positive', message: JSON.stringify(receipt) })
        // $router.go(0);
    }catch(e) {
        $q.notify({ color: 'negative', message: JSON.stringify(e) })
        $q.loading.hide()
    }
}
</script>