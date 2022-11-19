import { ethers } from "ethers";
import { ref } from "vue";

export interface SaveData {
  address: string | null
  network: Network
}

interface Network {
  name: string | null,
  logo: string | null,
  chainId: number | null
}

const wallet = ref<SaveData>({
  address: null,
  network: {
    name: null,
    logo: null,
    chainId: null
  }
});

const signerState = ref<ethers.Signer|null>(null)

export const useWalletStore = () => {
  const setWallet = (newWallet:SaveData) => {
    console.log(newWallet)
    wallet.value = newWallet;
  };
  return { wallet, setWallet };
};

export const useSignerStore = () => {
  const setSigner = (signer: ethers.Signer) => {
    signerState.value = signer
  }

  return {signerState, setSigner}
}