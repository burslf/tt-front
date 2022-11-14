<template>
  <q-toolbar class="relative bg-dark text-white q-py-xs" style="height: 70px;">

    <q-toolbar-title @click="() => router.push('/')" style="cursor:pointer;height: 100%;">
      <img src="../../public/assets/logo.png" alt="" style="height: 100%;">
      <!-- <q-img src=" " style="height: 100%;" /> -->
    </q-toolbar-title>

    <div v-if="!mobileState" class="row items-center">
      <q-tabs no-caps>
        <q-route-tab v-if="wallet" name="raise-capital" icon="fa-solid fa-sack-dollar" label="Raise Capital" exact
          to="/raise-capital" />
        <q-route-tab name="explore" icon="explore" label="Explore" to="/explore" />

      </q-tabs>
      <div>
        <q-btn v-if="!wallet" class="q-mx-sm" push no-caps color="secondary" label="Connect" icon="wallet"
          @click="() => connectWallet()" />
      </div>
      <div v-if="wallet" class="flex column" @click="confirm">
        <q-chip class="cursor-pointer">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
          {{ wallet.accountIds[0] }}
        </q-chip>
      </div>
    </div>

    <div v-if="mobileState">
      <q-btn dense flat round icon="menu" @click="toggleDrawer()" />
    </div>

  </q-toolbar>
</template>

<script setup>
import { useRouter } from "vue-router";
import { HashConnect } from 'hashconnect';
import { useHashconnectStore } from "../stores/hashconnect-store";
import { useQuasar } from 'quasar'
import { useDrawerState, useScreenState } from '../stores/drawer-store';
import { watch } from "vue";

const { drawerState, setDrawerState } = useDrawerState();
const { mobileState, setMobileState } = useScreenState()
const toggleDrawer = () => {
  setDrawerState(!drawerState.value)
}

const router = useRouter()
const { wallet, setWallet } = useHashconnectStore()
const hashconnect = new HashConnect()
const hashMetadata = {
  name: "ProCapial",
  description: "Put some description here"
}
let saveData = {
  topic: "",
  pairingString: "",
  encryptionKey: "",
  pairingData: []
}

const $q = useQuasar()

const connectWallet = async () => {
  setupHashConnectEvents()
  const isLocalData = loadLocalData()
  if (!isLocalData) {
    // first init if no hashconnect data on localstorage
    await hashconnect.init(hashMetadata, "mainnet", true);
  }
  else {
    //use loaded data for initialization + connection
    await hashconnect.init(hashMetadata, "mainnet", true);
    await hashconnect.connect(saveData.topic, saveData.pairedWalletData);
  }
}

const disconnectWallet = async () => {
  hashconnect.clearConnectionsAndData()
  setWallet(null)
}

const loadLocalData = () => {
  let foundData = localStorage.getItem("hashconnectData");
  if (foundData) {
    saveData = JSON.parse(foundData);
    return true;
  }
  else
    return false;
}

const setupHashConnectEvents = () => {
  hashconnect.pairingEvent.once((pairingData) => {
    setWallet(pairingData)
  })

  hashconnect.foundExtensionEvent.once(async (walletMetadata) => {
    if (saveData.pairingData.length == 0) {
      hashconnect.connectToLocalWallet();
    }
  })

  hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
    console.log("AKNOWLEDGE ", acknowledgeData)
  })

  hashconnect.connectionStatusChangeEvent.once((connectionStatus) => {
    console.log("CONNECTION STATUS: ", connectionStatus)
    if (connectionStatus === "Connected") {
      if (saveData.pairingData.length > 0) {
        setWallet(saveData.pairingData[0])
      }
    }
  })
}

const confirm = () => {
  $q.dialog({
    title: 'Logout',
    message: 'Would you like to logout?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    disconnectWallet()
  })
}

watch(
  () => $q.screen.width,
  (w, oldW) => {
    if (w < 800) {
      setMobileState(true)
    } else {
      setMobileState(false)
    }
  }
)

</script>
