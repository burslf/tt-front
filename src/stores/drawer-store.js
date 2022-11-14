import {ref} from 'vue';

const drawerState = ref(false);
const mobileState = ref(false);

export const useDrawerState = () => {
    const setDrawerState = (bool) => {
      drawerState.value = bool
    }

    return {
        drawerState, 
        setDrawerState
    }
}

export const useScreenState = () => {
  const setMobileState = (bool) => {
    mobileState.value = bool
  }

  return {
    mobileState,
    setMobileState
  }
}
