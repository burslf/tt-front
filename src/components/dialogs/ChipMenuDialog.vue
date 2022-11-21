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
            <q-btn class="q-mx-xs" color="secondary" @click="() => {}" icon="person" label="profile"/>
            <q-btn class="q-mx-xs" color="secondary" @click="() => {}" :icon="`img:/public/assets/${wallet.network.logo}.png`" :label="wallet.network.name!" />
            <q-btn class="q-mx-xs" color="secondary" @click="() => logout()" icon="logout" label="Logout"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <ConfirmDialog/>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import ConfirmDialog from './ConfirmDialog.vue';
import { useConfirmDialogState, useMenuDialogState } from '../../stores/dialog-store';
import { useWalletStore } from '../../stores/wallet-store';

const props = defineProps<{
  disconnectWallet: () => void
}>()
type Position = "top" | "standard" | "right" | "bottom" | "left" | undefined 

const { menuDialogState, setMenuDialog } = useMenuDialogState()
const { setConfirmDialog, setConfirmFunction } = useConfirmDialogState();
const {wallet, setWallet} = useWalletStore()

const position: Ref<Position> = ref<Position>('top')

const logout = () => {
    setConfirmFunction(() => { 
    props.disconnectWallet();
    setMenuDialog(false)
    })
  
  setConfirmDialog(true)
}

</script>

<style lang="scss">

</style>