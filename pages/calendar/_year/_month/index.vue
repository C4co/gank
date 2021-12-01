<script lang="ts">
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import { calendar } from '@/queries/index'
const range = require('lodash.range')

type Data = {
  games?: any
  infiniteId: any
  months: any[]
  nextRequest: string
  validYears: Array<number>
  validMonths: Array<number>
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
      months: [],
      validYears: range(1980, 2022),
      validMonths: range(1, 13)
    }
  },

  async fetch(){
    try {
      const { year, month } = this.$route.params

      if(!year || !this.validYears.includes(Number(year))){
        throw new Error('Page don\'t exists')
      }

      if(!month || !this.validMonths.includes(Number(month))){
        throw new Error('Page don\'t exists')
      }

      const gameRes = await this.$axios.$get(`/games/calendar/${year}/${month}`, calendar(1))

      this.nextRequest = gameRes.next || null
      this.games = gameRes.results
      this.months = gameRes.months

    } catch (error) {
      return this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    }
  },

  mounted(){
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
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
  fetchKey: 'calendar',
})
</script>

<template>
  <div>
    <h1 v-if="$fetchState.pending"> loading calendar </h1>
    <h1 v-else-if="$fetchState.error"> Error </h1>

    <div v-else>
      <h1> Calendar </h1>

      <div class="menu">
        <p v-for="item in months" :key="item.year + item.month">
          <NuxtLink :to="`/calendar/${item.year}/${item.month}`">
            {{ item.year }}/{{ item.month }}
          </NuxtLink>
        </p>
      </div>

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

<style lang="scss" scoped>

  .menu{
    border: solid red 1px;
    display: flex;
    gap: 10px;
    padding: 10px;
  }

</style>
