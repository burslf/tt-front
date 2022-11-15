<template>
    <q-dialog v-model="menuDialogState" :position="position">
      <q-card style="width: 350px" class="justify-center align-center flex" >
        <q-toolbar style="height: 50px;" class="flex justify-between">
          <!-- <q-avatar style="height: 100%; width: 100px;">
            <img src="/public/assets/logo.png">
          </q-avatar> -->

          <q-toolbar-title shrink><span class="text-weight-bold">Ticketrust</span> Inc.</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section style="height: 150px;" class="menu-btn row items-center justify-center">
            <q-btn class="q-mx-xs" color="secondary" @click="() => setDialog(true)" icon="person" label="profile"/>
            <q-btn class="q-mx-xs" color="secondary" @click="() => setDialog(true)" :icon="`img:/public/assets/${wallet.network.logo}.png`" :label="wallet.network.name!" />
            <q-btn class="q-mx-xs" color="secondary" @click="() => setDialog(true)" icon="logout" label="Logout"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <CustomDialog/>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import CustomDialog from './CustomDialog.vue';
import { useDialogState, useMenuDialogState } from '../stores/dialog-store';
import { useWalletStore } from '../stores/wallet-store';

type Position = "top" | "standard" | "right" | "bottom" | "left" | undefined 

const { setDialog } = useDialogState();
const { menuDialogState } = useMenuDialogState()
const {wallet, setWallet} = useWalletStore()

const position: Ref<Position> = ref<Position>('top')


</script>

<style lang="scss">

</style>