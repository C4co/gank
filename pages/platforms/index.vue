<script lang="ts">
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import { platforms } from '@/queries/index'

type Data = {
  platforms?: any
  infiniteId: any,
  nextRequest: string
}

export default Vue.extend({
  components: {
    InfiniteLoading
  },

  data: (): Data => {
    return {
      platforms: undefined,
      infiniteId: +new Date(),
      nextRequest: ''
    }
  },

  async fetch(){
    const res = await this.$axios.$get('/platforms', platforms(1))

    this.nextRequest = res.next || null
    this.platforms = res.results
  },

  methods: {
    async infiniteHandler($state: any){
      if(this.nextRequest){
        const res = await this.$axios.$get(this.nextRequest)
        this.platforms.push(...res.results)
        this.nextRequest = res.next

        $state.loaded()
      }else{
        $state.complete()
      }
    }
  },

  fetchOnServer: true,
  fetchKey: 'platforms'
})
</script>

<template>
  <div>
    <h1> Platforms </h1>

    <p v-for="(platform, index) in platforms" :key="`${index}-${platform.id}`" >
      <NuxtLink :to="`platforms/${platform.id}`">
        {{ platform.name }}
      </NuxtLink>
    </p>

    <ClientOnly>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"> </infinite-loading>
    </ClientOnly>
  </div>
</template>
