<script lang="ts">
import Vue from 'vue'
import { game } from '@/queries/index'

type Data = {
  game: any
  gameSerie: any
}

export default Vue.extend({
  data: (): Data => {
    return {
      game: undefined,
      gameSerie: undefined
    }
  },

  async fetch(){
    this.game = await this.$axios.$get(`/games/${this.$route.params.id}`, game)
    this.gameSerie = await this.$axios.$get(`/games/${this.$route.params.id}/game-series`, game)
  },

  fetchOnServer: false,
  fetchKey: 'home-page',

  mounted(){
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
  }
})
</script>

<template>
  <div>
    <h1 v-if="$fetchState.pending"> Loading posts... </h1>
    <h1 v-else-if="$fetchState.error"> An error occurred </h1>

    <div v-else>
      <NuxtLink :to="`${game.id}/images`"> image </NuxtLink>
      <h1> {{ game.name }} </h1>
      <img class="image" :src="game.background_image" alt="background image">
      <div> {{ game.description_raw }} </div>
    </div>
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
