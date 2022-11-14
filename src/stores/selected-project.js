import {ref} from 'vue';
import projectMock from 'src/assets/projects.json';

const selectedProject = ref(null);


export const useSelectedProject = () => {
    const setSelectedProject = (p) => {
        selectedProject.value = p
    }

    return {
        selectedProject, 
        setSelectedProject
    }
}