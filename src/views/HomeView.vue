<template>
  <div class="home">
    <ImageSearchPage> </ImageSearchPage>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImageSearchPage from '@/components/ImageSearchPage.vue';

@Component({
  components: {
    ImageSearchPage,
  },
})
export default class HomeView extends Vue {}
</script>
