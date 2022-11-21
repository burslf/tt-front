import {ref} from 'vue';

const confirmDialogState = ref(false);
const confirmFunction = ref(() => {console.log('To Implement')});

const menuDialogState = ref(false);
const buyTicketDialog = ref(false);

export const useConfirmDialogState = () => {
  const setConfirmDialog = (bool: boolean) => {
    confirmDialogState.value = bool
  }
  const setConfirmFunction = (f) => {
    confirmFunction.value = f
  }

  return {
    confirmDialogState,
    setConfirmDialog,
    confirmFunction,
    setConfirmFunction
  }
}

export const useMenuDialogState = () => {
  const setMenuDialog = (bool: boolean) => {
    menuDialogState.value = bool
  }

  return {
    menuDialogState,
    setMenuDialog
  }
}

export const useBuyTicketDialogState = () => {
  const setBuyTicketDialog = (bool: boolean) => {
    buyTicketDialog.value = bool
  }

  return {
    buyTicketDialog,
    setBuyTicketDialog
  }
}
