<template>
    <form class="bg-gray-700 shadow-lg rounded-md flex flex-col md:flex-row items-center justify-center py-8 px-4"
        @submit.prevent="searchImages">
        <input type="date" v-model="searchFormState.searchDate" required placeholder="select a date"
            class="border text-sm rounded-lg block w-full max-w-sm pl-10 p-2.5 bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 md:mr-4" />
        <select v-model="searchFormState.selectedRover" required
            class="border text-md w-full max-w-sm rounded-lg block p-2.5 bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 md:mr-4 mt-4 md:mt-0">
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
        </select>
        <select id="cameras" v-model="searchFormState.selectedCamera" required
            class="border text-md w-full max-w-sm rounded-lg block p-2.5 bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 md:mr-4 mt-4 md:mt-0">
            <option v-for="camera in roverCamerasList" :value="camera" :key="camera">{{ camera }}</option>
        </select>

        <button type="submit"
            class="text-white bg-gradient-to-r from-secondary to-primary hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-10 py-2.5 text-center mt-4 md:mt-0">
            Search
        </button>
    </form>
</template>
  
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RoverApiService from '@/assets/services/roverApiService';

interface RoverCameras {
    [rover: string]: string[];
}

class SearchFormState {
    public searchDate = '';
    public selectedRover = 'curiosity';
    public selectedCamera = 'FHAZ';
    public roverCameras: RoverCameras = {
        curiosity: ['FHAZ', 'RHAZ', 'NAVCAM', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI'],
        opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
        spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
    };
}

@Component
export default class MarsRoverSearch extends Vue {
    @Prop({ required: true, type: String }) private readonly apiKey!: string;

    private searchFormState = new SearchFormState();

    private async searchImages(): Promise<void> {
        try {
            const roverApiService = new RoverApiService(this.apiKey);
            const images = await roverApiService.searchImages(
                this.searchFormState.selectedRover,
                this.searchFormState.searchDate,
                this.searchFormState.selectedCamera
            );
            this.$emit('search-results', images);
        } catch (error) {
            console.error('Error occurred while looking for images:', error);
        }
    }

    private get roverCamerasList(): string[] {
        return this.searchFormState.roverCameras[this.searchFormState.selectedRover] || [];
    }
}
</script>
  