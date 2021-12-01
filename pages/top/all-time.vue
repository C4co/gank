<script lang="ts">
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import { allTimeTop } from '@/queries/index'

type Data = {
  games?: any
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
      infiniteId: +new Date(),
      nextRequest: ''
    }
  },

  async fetch(){
    const gameRes = await this.$axios.$get(`/games/lists/popular`, allTimeTop(1))

    this.nextRequest = gameRes.next || null
    this.games = gameRes.results
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
  fetchKey: 'calendar-page'
})
</script>

<template>
  <div>
    <h1> All of time </h1>

    <p v-for="(game, index) in games" :key="`${index}-${game.id}`" >
      <NuxtLink :to="`/games/${game.id}`" >
        {{ game.name }} - {{ game.released }}
      </NuxtLink>
    </p>

    <ClientOnly>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"> </infinite-loading>
    </ClientOnly>
  </div>
</template>
