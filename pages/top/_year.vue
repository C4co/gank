<script lang="ts">
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import { bestOfTheYear } from '@/queries/index'

type Data = {
  games?: any
  infiniteId: any,
  nextRequest: string,
  year: string | number
}

export default Vue.extend({
  components: {
    InfiniteLoading
  },

  data: (): Data => {
    return {
      games: undefined,
      infiniteId: +new Date(),
      nextRequest: '',
      year: ''
    }
  },

  async fetch(){
    try {
      const { year } = this.$route.params
      const gameRes = await this.$axios.$get(`/games/lists/greatest`, bestOfTheYear(1, Number(year)))

      this.nextRequest = gameRes.next || null
      this.games = gameRes.results
    } catch (error) {
      return this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    }
  },

  mounted(){
    this.year = this.$route.params.year
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

  fetchOnServer: false,
  fetchKey: 'calendar-page'
})
</script>

<template>
  <div>
    <div v-if="$fetchState.pending"> loading calendar </div>
    <div v-else-if="$fetchState.error"> Error </div>

    <div v-else>
      <h1> Best of: {{ year }} </h1>

      <p v-for="(game, index) in games" :key="`${index}-${game.id}`" >
        <NuxtLink :to="`/games/${game.id}`" >
          {{ game.name }} - {{ game.released }}
        </NuxtLink>
      </p>

      <ClientOnly>
        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"> </infinite-loading>
      </ClientOnly>
    </div>
  </div>
</template>
