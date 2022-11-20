import {ref} from 'vue';
import projectMock from '../assets/projects.json';
import { CreatedTickets } from '../interfaces';

const selectedProject = ref<CreatedTickets | null>(null);


export const useSelectedProject = () => {
    const setSelectedProject = (p) => {
        selectedProject.value = p
    }

    return {
        selectedProject, 
        setSelectedProject
    }
}