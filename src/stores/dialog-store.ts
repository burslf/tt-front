import {ref} from 'vue';

const dialogState = ref(false);
const menuDialogState = ref(false);

export const useDialogState = () => {
  const setDialog = (bool: boolean) => {
    dialogState.value = bool
  }

  return {
    dialogState,
    setDialog
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
