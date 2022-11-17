import {Ref, ref} from 'vue';
import {CreateEventForm} from '../interfaces';

const createEventForm:Ref<CreateEventForm> = ref<CreateEventForm>({
    eventName: "",
    eventImage: [],
    eventPrice: "",
    ticketsTotal: "",
    eventDate: "",
    optionsFees: "",
    shares: [],
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
