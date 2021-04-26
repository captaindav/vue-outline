<template>
  <v-main>
    <v-alert type="info">
      Testing Nuxt Environment
    </v-alert>
    <v-btn @click="getData">Get Data</v-btn>
    {{page}}
    <Druxt
      module="entity"
      :props-data="{
        type: 'outline_entry--outline_1',
      }"
    />
  </v-main>
</template>

<script>
  export default {
    name: 'index',
    data: () => ({
      page: null
    }),
    methods: {
      async getData () {
        this.page = await this.$druxt.getCollection('outline_entry--outline_1')
        
        console.log('test', this.page)
      }
    }
  }
</script>