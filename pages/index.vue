<script lang="ts">
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import { gamesTrending, genres } from '@/queries/index'
import { Collection } from '@/types/index'

type Data = {
  games?: any
  genres?: Collection
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
      infiniteId: +new Date(),
      nextRequest: ''
    }
  },

  async fetch(){
    const gameResponse = await this.$axios.$get('/games/lists/main', gamesTrending(1))
    const genresResponse = await this.$axios.$get('/genres', genres)

    this.nextRequest = gameResponse.next || null
    this.games = gameResponse.results
    this.genres = genresResponse.results
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
  fetchKey: 'home'
})
</script>

<template>
  <div>
    <h1> Trendings </h1>

    <div class="menu">
      <NuxtLink to="/platforms"> Platforms </NuxtLink>
      <br>
      <NuxtLink to="/calendar/2021/10"> Calendário 2021/10 </NuxtLink>
      <br>
      <NuxtLink to="top/all-time"> Bests of all time </NuxtLink>
      <br>
      <NuxtLink to="/top/2021"> Bests of 2021 </NuxtLink>
    </div>

    <p v-for="(game, index) in games" :key="`${index}-${game.id}`" >
      <NuxtLink :to="`/games/${game.id}`" >
        {{ game.name }}
      </NuxtLink>
    </p>

    <ClientOnly>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"> </infinite-loading>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
  .menu {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: solid red 1px;
  }
</style>
