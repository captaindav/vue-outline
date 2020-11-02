<template>
  <v-toolbar color="transparent" dense>
    <v-tooltip
      v-for="(laItem, la) in leftActions"
      :key="`la-${la}`"
      bottom
    >
      <template #activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          v-on="{
            ...on,
            click: laItem.click
          }"
          icon
        >
          <v-icon v-text="laItem.icon" />
        </v-btn>
      </template>
      <span class="text-capitalize">{{la}}</span>
    </v-tooltip>

    <v-spacer />

    <v-tooltip
      v-for="(raItem, ra) in rightActions"
      :key="`ra-${ra}`"
      bottom
    >
      <template #activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          v-on="{
            ...on,
            click: raItem.click
          }"
          icon
        >
          <v-icon v-text="raItem.icon" />
        </v-btn>
      </template>
      <span class="text-capitalize">{{ra}}</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
  import { reactive } from '@vue/composition-api'

  export default {
    name: 'Toolbar',

    setup() {
      const leftActions = reactive({
        add: { click: () => {console.log('add')}, disabled: false, icon: 'mdi-plus' },
        edit: { click: () => {console.log('edit')}, disabled: false, icon: 'mdi-pencil' },
        rename: { click: () => {console.log('rename')}, disabled: false, icon: 'mdi-form-textbox' },
        delete: { click: () => {console.log('delete')}, disabled: false, icon: 'mdi-delete' },
        cut: { click: () => {console.log('cut')}, disabled: false, icon: 'mdi-content-cut' },
        copy: { click: () => {console.log('copy')}, disabled: false, icon: 'mdi-content-copy' },
        paste: { click: () => {console.log('paste')}, disabled: false, icon: 'mdi-content-paste' },
      })
      const rightActions = reactive({})

      return {
        leftActions,
        rightActions,
      }
    },
  }
</script>
