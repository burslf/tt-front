<template>
    <div class="flex justify-around items-center split-share-ctnr" style="width: 90%; max-width: 700px" v-for="(share, index) in ethAddresses" :key="index">
        <q-input
         style="width: 65%;" color="accent" label="Ethereum address" filled dense class="q-ma-sm eth-input"
         v-model="share.address" @update:model-value="() => handlePayeeInput()" />
        <q-input style="width: 10%; min-width: 100px;" label="Share" dense filled v-model="share.share" type="number" @update:model-value="() => handlePayeeInput()" class="q-ma-sm">
        <template v-slot:append>
          <q-avatar>
            <q-icon name="percent"/>
          </q-avatar>
        </template>
        </q-input>
        <div style="width: 40px" >
            <q-btn
                v-if="index > 0"
                size="10px"
                round
                color="primary"
                icon="close"
                @click="() => removeIndex(index)"
            />
        </div>
    </div>
    <div class="q-ma-md">
        <q-btn round color="accent" icon="add" @click="() => ethAddresses.push({address: '', share: 0})"/>
    </div>
</template>

<script setup lang="ts">import { ref } from 'vue';
import { useCreateEventForm } from '../../stores/createEventForm-store';

const {createEventForm} = useCreateEventForm()
const ethAddresses = ref([
    {address: "", share: 0}
])

const handlePayeeInput = () => {
    if (ethAddresses.value[0].address.length > 0){
        const payeesAddresses = ethAddresses.value.map(a => a.address)
        const payeesShares = ethAddresses.value.map(a => a.share)

        createEventForm.value.payees = payeesAddresses
        createEventForm.value.shares = payeesShares
        
    }else {
        createEventForm.value.payees = []
        createEventForm.value.shares = []
    }
}

const removeIndex = (index: number) => {
    ethAddresses.value = ethAddresses.value.filter((a, i) => i !== index)
    handlePayeeInput()
}

</script>

<style lang="scss">
    @media only screen and (max-width: 750px) {
        .split-share-ctnr {
            justify-content: space-between;
        }
        .eth-input {
            width: 100% !important;
        }
    }
</style>