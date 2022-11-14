import {ref} from 'vue';
import projectMock from 'src/assets/projects.json';

const projectMockData = [...projectMock];

const exploreCards = ref(projectMockData)

export const useExploreState = () => {
    const setExploreCards = (cards) => {
        exploreCards.value = cards
    }

    return {
        exploreCards, 
        setExploreCards
    }
}
  