<script lang="ts">
import Vue from 'vue'
import { genreGames } from '../../queries'

type Data = {
  genre: any
}

export default Vue.extend({
  data: (): Data => {
    return {
       genre: undefined,
    }
  },

  async fetch(){
    try{
      const id = this.$route.params.id
      this.genre = await this.$axios.$get(`/genres/${id}`, genreGames())
    }catch (error) {
      return this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    }
  },

  mounted(){
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
  },

  fetchOnServer: false,
  fetchKey: 'home-page',
})

</script>

<template>
  <div>
    <h1 v-if="$fetchState.pending"> loading genre page... </h1>
    <h1 v-else-if="$fetchState.error"> Error </h1>
    <div v-else>
      <img :src="genre.image_background" :alt="genre.name">
      <h1> {{ genre.name }} </h1>
      <p> {{ genre.description }} </p>
    </div>
  </div>
</template>
