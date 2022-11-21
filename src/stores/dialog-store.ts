import {ref} from 'vue';

const confirmDialogState = ref(false);
const menuDialogState = ref(false);
const buyTicketDialog = ref(false);

export const useConfirmDialogState = () => {
  const setConfirmDialog = (bool: boolean) => {
    confirmDialogState.value = bool
  }

  return {
    confirmDialogState,
    setConfirmDialog
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
