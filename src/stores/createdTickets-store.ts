import { ref } from "vue";
import projectMock from "../assets/tickets_created.json";
import {CreatedTickets} from '../interfaces';

const projectMockData = [...projectMock];

const createdTickets = ref<CreatedTickets[]>([]);

export const useCreatedTickets = () => {
  const setCreatedTickets = (cards: CreatedTickets[]) => {
    createdTickets.value = cards;
  };

  return {
    createdTickets,
    setCreatedTickets,
  };
};
