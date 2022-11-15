import {ref} from 'vue';

const raiseCapitalForm = ref({
    artistProfileFile: [],
    albumFile: [],
    artistName: "",
    artName: "",
    dateCountdown: "",
    amount: null,
    percentage: null
})

export const useRaiseCapitalStore = () => {
    const setRaiseCapitalForm = (raiseCapitalForm) => {
        raiseCapitalForm.value = raiseCapitalForm
    }

    return {
        raiseCapitalForm, 
        setRaiseCapitalForm
    }
}
