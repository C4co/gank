<script lang="ts">
import Vue from 'vue'
import { game } from '@/queries/index'

type Data = {
  game: any
  serie: any
  images: any
  achievements: any
  movies: any
}

export default Vue.extend({
  data: (): Data => {
    return {
      game: undefined,
      serie: undefined,
      images: undefined,
      achievements: undefined,
      movies: undefined
    }
  },

  async fetch(){
    try {
      this.game = await this.$axios.$get(`/games/${this.$route.params.id}`, game)
      this.serie = await this.$axios.$get(`/games/${this.$route.params.id}/game-series`, game)
      this.images = await this.$axios.$get(`/games/${this.$route.params.id}/screenshots`, game)
      this.achievements = await this.$axios.$get(`/games/${this.$route.params.id}/achievements`, game)
      this.movies = await this.$axios.$get(`/games/${this.$route.params.id}/movies`, game)
    } catch (error) {
      return this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    }
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
      <h1> {{ game.name }} </h1>
      <img class="image" :src="game.background_image" alt="background image">
      <div> {{ game.description_raw }} </div>
    </div>

    <section v-if="images" class="gallery">
      <div v-for="item in images.results" :key="item.id">
        <img :src="item.image" alt="image collection">
      </div>
    </section>

    <hr>

    <section v-if="serie">
      <div v-for="item in serie.results" :key="item.id">
        {{ item.name }}
      </div>
    </section>

    <hr>

    <section v-if="achievements">
      {{ achievements.count }}
      <div v-for="item in achievements.results" :key="item.id">
        <img class="image" :src="item.image" :alt="item.name">
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .image{
    object-fit: cover;
    object-position: center center;
    border: solid red 1px;
    max-width: 1000px;
  }

  .gallery{
    display: flex;
    gap: 0;
    width: 100%;

    div{
      width: 100%;
      padding: 0;

      img{
        width: 100%;
      }
    }
  }
</style>
