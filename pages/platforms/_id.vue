<script lang="ts">
import Vue from 'vue'
import { game } from '@/queries/index'

type Data = {
  platform: any
}

export default Vue.extend({
  data: (): Data => {
    return {
      platform: undefined,
    }
  },

  async fetch(){
    try {
      this.platform = await this.$axios.$get(`/platforms/${this.$route.params.id}`, game)

      console.log(this.platform)
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
      <h1> {{ platform.name }} </h1>
    </div>
  </div>
</template>
