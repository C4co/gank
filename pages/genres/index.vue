<script lang="ts">
import Vue from 'vue'
import { genres } from '../../queries'

type Data = {
  genres?: any
}

export default Vue.extend({
  data: (): Data => {
    return {
      genres: undefined
    }
  },

  async fetch(){
    this.genres = await this.$axios.$get('/genres', genres)
  },

  fetchOnServer: true,
  fetchKey: 'home'
})
</script>

<template>
  <div>
    <div v-for="genre in genres.results" :key="genre.id">
      <NuxtLink :to="`/genres/${genre.id}`">
        {{ genre.name }}
      </NuxtLink>

      <hr>
        <div v-for="game in genre.games" :key="game.id">
          <NuxtLink :to="`/games/${game.id}`">
            {{ game.name }}
          </NuxtLink>
        </div>
      <hr>
    </div>
  </div>
</template>
