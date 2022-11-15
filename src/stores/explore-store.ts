import { ref } from "vue";
import projectMock from "../assets/projects.json";

const projectMockData = [...projectMock];

const exploreCards = ref(projectMockData);

interface Card {
  id: number;
  artistProfileFile: string;
  albumFile: string;
  artistName: string;
  artName: string;
  dateCountdown: string;
  amount: number;
  percentage: number;
}

export const useExploreState = () => {
  const setExploreCards = (cards: Card[]) => {
    exploreCards.value = cards;
  };

  return {
    exploreCards,
    setExploreCards,
  };
};
