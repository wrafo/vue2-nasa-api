<template>
    <div class="flex flex-wrap gap-5 justify-center">
      <div class="flex flex-wrap gap-5 justify-center items-center w-11/12">
        <carousel :perPageCustom="[[768, 2], [1024, 3], [1540, 4]]" navigationEnabled>
          <slide v-for="image in images" :key="image.id">
            <div class="max-w-sm border rounded-lg shadow shadow-black bg-gray-700 border-black">
              <a :href="image.img_src" target="_blank">
                <img class="rounded-t-lg" :src="image.img_src" alt="Image" />
              </a>
              <div class="p-5">
                <p class="mb-3 text-white font-bold">{{ image.earth_date }}</p>
                <p class="mb-3 font-bold text-white">{{ image.rover.name }}</p>
                <p class="mb-3 font-bold text-white">{{ image.camera.full_name }}</p>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </template>
    
  <script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { Carousel, Slide } from 'vue-carousel';
  
  interface Image {
    id: number;
    img_src: string;
    earth_date: string;
    rover: {
      name: string;
    };
    camera: {
      full_name: string;
    };
  }
  
  @Component({
    components: {
      Carousel,
      Slide,
    },
  })
  export default class ImageCarousel extends Vue {
    @Prop({ required: true, type: Array }) private readonly images!: Image[];
  }
  </script>
  
  <style scoped>
  </style>
  