import { ref } from "vue";

export interface SaveData {
  signer: string | null
  network: Network
}

interface Network {
  name: string | null,
  logo: string | null,
  chainId: number | null
}

const wallet = ref<SaveData>({
  signer: null,
  network: {
    name: null,
    logo: null,
    chainId: null
  }
});

export const useWalletStore = () => {
  const setWallet = (newWallet:SaveData) => {
    wallet.value = newWallet;
  };
  return { wallet, setWallet };
};
