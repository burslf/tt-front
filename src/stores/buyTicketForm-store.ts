import {Ref, ref} from 'vue';
import {BuyTicketForm} from '../interfaces';

const buyTicketForm:Ref<BuyTicketForm> = ref<BuyTicketForm>({
    amount: 0,
    recipient: ""
})

export const useBuyTicketForm = () => {
    const setBuyTicketForm = (form: BuyTicketForm) => {
        buyTicketForm.value = form
    }

    return {
        buyTicketForm, 
        setBuyTicketForm
    }
}
