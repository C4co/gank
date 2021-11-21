<script lang="ts">
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import { gamesTrending, genres, platforms } from '@/queries/index'
import { Collection } from '@/types/index'

type Data = {
  games?: any
  genres?: Collection
  platforms?: Collection
  infiniteId: any,
  nextRequest: string
}

export default Vue.extend({
  components: {
    InfiniteLoading
  },

  data: (): Data => {
    return {
      games: undefined,
      genres: undefined,
      platforms: undefined,
      infiniteId: +new Date(),
      nextRequest: ''
    }
  },

  async fetch(){
    const gameRes = await this.$axios.$get('/games/lists/main', gamesTrending(1))
    const genresRes = await this.$axios.$get('/genres', genres)
    const platformsRes = await this.$axios.$get('/platforms/lists/parents', platforms)

    this.nextRequest = gameRes.next || null
    this.games = gameRes.results
    this.genres = genresRes.results
    this.platforms = platformsRes.results
  },

  methods: {
    async infiniteHandler($state: any){
      if(this.nextRequest){
        const res = await this.$axios.$get(this.nextRequest)
        this.games.push(...res.results)
        this.nextRequest = res.next

        $state.loaded()
      }else{
        $state.complete()
      }
    }
  },

  fetchOnServer: true,
  fetchKey: 'home-page'
})
</script>

<template>
  <div>
    <p v-for="(game, index) in games" :key="`${index}-${game.id}`" >
      <NuxtLink :to="`games/${game.id}`" >
        {{ game.name }}
      </NuxtLink>
    </p>

    <ClientOnly>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"> </infinite-loading>
    </ClientOnly>
  </div>
</template>
