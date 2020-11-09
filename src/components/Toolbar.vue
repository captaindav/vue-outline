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
          :disabled="laItem.disabled"
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
          :disabled="raItem.disabled"
          icon
        >
          <v-icon v-text="raItem.icon" />
        </v-btn>
      </template>
      <span class="text-capitalize">{{ra}}</span>
    </v-tooltip>
    {{pasteDisabled}}
  </v-toolbar>
</template>

<script>
  import { reactive } from '@vue/composition-api'
  import { getMenuActions } from '@/utils/menu-actions'

  export default {
    name: 'Toolbar',

    setup(props, context) {
      const {
        addEntry,
        copyEntry,
        cutEntry,
        deleteEntry,
        editEntry,
        pasteEntry,
        pasteDisabled,
        renameEntry
      } = getMenuActions(context)
      
      const leftActions = reactive({
        add: { click: addEntry, disabled: false, icon: 'mdi-plus' },
        edit: { click: editEntry, disabled: false, icon: 'mdi-pencil' },
        rename: { click: renameEntry, disabled: true, icon: 'mdi-form-textbox' },
        delete: { click: deleteEntry, disabled: false, icon: 'mdi-delete' },
        cut: { click: cutEntry, disabled: false, icon: 'mdi-content-cut' },
        copy: { click: copyEntry, disabled: true, icon: 'mdi-content-copy' },
        paste: { click: pasteEntry, disabled: pasteDisabled, icon: 'mdi-content-paste' },
      })
      const rightActions = reactive({})

      return {
        leftActions,
        rightActions,
        pasteDisabled
      }
    },
  }
</script>
