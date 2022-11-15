
interface Window {
  // pick one
  ethereum: EthereumProvider
  // ethereum: ExternalProvider
  // ethereum: AbstractProvider
}

// ExternalProvider seems to be the official ethersproject type for the window.ethereum object, however, `new Web3(ethereum)` does not like it so we must improvise.
declare type ExternalProvider = import('@ethersproject/providers').ExternalProvider
interface EthereumProvider extends ExternalProvider {
  _state: any
}