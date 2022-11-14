import {ref} from 'vue';

const wallet = ref(null)

export const useHashconnectStore = () => {
    const setWallet = (newWallet) => {
      wallet.value = newWallet
    }
    return {wallet, setWallet}
}
  