<script lang="ts">
import Vue from 'vue'
import { game } from '@/queries/index'

type Data = {
  images: any
}

export default Vue.extend({
  data: (): Data => {
    return {
      images: undefined
    }
  },

  async fetch(){
    const res = await this.$axios.$get(`/games/${this.$route.params.id}/screenshots`, game)
    this.images = res.results
  },

  fetchOnServer: false,
  fetchKey: 'images-page',
})
</script>

<template>
  <h1 v-if="$fetchState.pending"> Loading posts... </h1>
  <h1 v-else-if="$fetchState.error"> An error occurred </h1>

  <div v-else>
    <figure v-for="item in images" :key="item.id">
      <img class="image" :src="item.image" alt="screenshot">
    </figure>
  </div>
</template>

<style lang="scss" scoped>
  .image{
    object-fit: cover;
    object-position: center center;
    border: solid red 1px;
    max-width: 1000px;
  }
</style>
