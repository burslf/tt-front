<template>
  <q-toolbar class="justify-between" style="height: 80px">
    <q-toolbar-title
      :shrink="true"
      @click="() => router.push('/')"
      class="items-center flex"
      style="cursor: pointer; height: 100%; max-width: 130px;"
    >
      <img src="../../public/assets/logo.png" alt="" style="width: 100%" />
      <!-- <q-img src=" " style="height: 100%;" /> -->
    </q-toolbar-title>

    <div v-if="!mobileState" class="row items-center">
      <q-tabs no-caps :content-class="'ueu'">
        <q-route-tab
          v-if="wallet.address"
          name="create-event"
          icon="monetization_on"
          label="Create Event"
          exact
          to="/create-event"
        />
        <q-route-tab
          name="explore"
          icon="explore"
          label="Explore"
          to="/explore"
        />
      </q-tabs>
      <div>
        <q-btn
          v-if="!wallet.address"
          class="q-mx-sm"
          push
          no-caps
          color="secondary"
          label="Connect"
          icon="wallet"
          @click="() => connectWallet()"
        />
      </div>
      <div v-if="wallet.address" class="flex column" @click="openMenu">
        <q-chip class="cursor-pointer">
          {{ concatAddress(wallet.address) }}
        </q-chip>
      </div>
    </div>

    <div v-if="mobileState" class="row items-center justify-end">
      <div>
        <q-btn
          v-if="!wallet.address"
          class="q-mx-sm"
          push
          no-caps
          color="secondary"
          label="Connect"
          icon="wallet"
          @click="() => connectWallet()"
        />
      </div>
      <div v-if="wallet.address" class="flex column" @click="openMenu">
        <q-chip class="cursor-pointer">
          {{ concatAddress(wallet.address) }}
        </q-chip>
      </div>
      <q-btn dense flat round icon="menu" @click="toggleDrawer()" />
    </div>
  </q-toolbar>

  <ChipMenuDialog/>
</template>

<script setup lang="ts">
import { ethers } from "ethers";

import { useRouter } from "vue-router";
import { useWalletStore, useSignerStore } from "../stores/wallet-store";
import { useQuasar } from "quasar";
import { useDrawerState, useScreenState } from "../stores/drawer-store";
import { watch, onMounted } from "vue";
import { useMenuDialogState } from '../stores/dialog-store';
import { concatAddress, networkIdToName } from "../helpers/web3helpers";
import ChipMenuDialog from "./dialogs/ChipMenuDialog.vue";

const $q = useQuasar();
const router = useRouter();

const { wallet, setWallet } = useWalletStore();
const {signerState, setSigner} = useSignerStore();
const { drawerState, setDrawerState } = useDrawerState();
const { mobileState, setMobileState } = useScreenState();

const {setMenuDialog} = useMenuDialogState();

const toggleDrawer = () => {
  setDrawerState(!drawerState.value);
};

const walletMetadata = {
  name: "Ticketrust",
  description: "Put some description here",
};

onMounted(() => {
  
  setupMetamaskEvents();

  const w = $q.screen.width;
  if (w < 800) {
    setMobileState(true);
  } else {
    setMobileState(false);
  }
});


const connectWallet = async () => {
  const provider = new ethers.providers.Web3Provider((window as never)['ethereum']);
  const signer = provider.getSigner()
  const isLocalData = loadLocalData();

  if (!isLocalData) {
    await provider.send("eth_requestAccounts", []);
    // const signature = await signer.signMessage("Hello World");
    // console.log(signature)
    const address = await signer.getAddress()
    const network = await provider.getNetwork()
    wallet.value.address = address
    wallet.value.network.chainId = network.chainId
    wallet.value.network.name = networkIdToName[network.chainId].name
    wallet.value.network.logo = networkIdToName[network.chainId].logo
    
    setSigner(signer)

    localStorage.setItem('signer', JSON.stringify(wallet.value))

  }
};

const disconnectWallet = async () => {
  // hashconnect.clearConnectionsAndData();
  localStorage.removeItem("signer");
  setWallet({...wallet.value, signer: null, address: null});
  const provider = new ethers.providers.Web3Provider((window as never)['ethereum'])
  const signer = provider.getSigner()
  console.log(signer)
};

const loadLocalData = () => {
  let foundData = localStorage.getItem("signer");
  if (foundData) {
    setWallet(JSON.parse(foundData))
    const provider = new ethers.providers.Web3Provider((window as never)['ethereum']);
    const signer = provider.getSigner()
    setSigner(signer)
    return true;
  } else return false;
};

const setupMetamaskEvents = () => {
  const ethereum:any = (window as Window)['ethereum'];

  ethereum.on('accountsChanged', async (accounts: never) => {
    if (accounts && accounts[0]) {
      if (accounts[0] !== wallet.value.address){
        setWallet({...wallet.value, address: accounts[0]})
        localStorage.setItem('signer', JSON.stringify(wallet.value))
      }
    }else {
       await disconnectWallet()
    }

  });

};

const openMenu = () => {
  setMenuDialog(true)
};

watch(
  () => $q.screen.width,
  (w, oldW) => {
    if (w < 800) {
      setMobileState(true);
    } else {
      setMobileState(false);
    }
  }
);
</script>
