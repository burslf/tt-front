import {Ref, ref} from 'vue';
import {CreateEventForm} from '../interfaces';

const createEventForm:Ref<CreateEventForm> = ref<CreateEventForm>({
    eventName: "",
    eventImage: null,
    eventPrice: null,
    ticketsTotal: null,
    eventDate: "",
    optionsFees: null,
    shares: [],
    payees: [],
    greyMarketAllowed: false,
})

export const useCreateEventForm = () => {
    const setCreateEventForm = (form: CreateEventForm) => {
        createEventForm.value = form
    }

    return {
        createEventForm, 
        setCreateEventForm
    }
}
