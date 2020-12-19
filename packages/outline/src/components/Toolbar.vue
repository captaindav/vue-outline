<template>
  <v-toolbar color="transparent" dense>
    <template v-for="(laItem, la) in leftActions">
      <v-divider
        v-if="laItem === 'divider'"
        :key="`ld-${la}`"
        vertical
      />
      
      <v-tooltip
       v-else
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
    </template>

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
        addOutline,
        copyEntry,
        cutEntry,
        deleteEntry,
        disabled,
        disabledPaste,
        editEntry,
        pasteEntry,
        renameEntry
      } = getMenuActions(context)
      
      const leftActions = reactive({
        addOutline: { click: addOutline, disabled: false, icon: 'mdi-book-plus' },
        d1: 'divider', 
        addEntry: { click: addEntry, disabled: disabled, icon: 'mdi-plus' },
        edit: { click: editEntry, disabled: disabled, icon: 'mdi-pencil' },
        rename: { click: renameEntry, disabled: true, icon: 'mdi-form-textbox' },
        delete: { click: deleteEntry, disabled: disabled, icon: 'mdi-delete' },
        cut: { click: cutEntry, disabled: disabled, icon: 'mdi-content-cut' },
        copy: { click: copyEntry, disabled: true, icon: 'mdi-content-copy' },
        paste: { click: pasteEntry, disabled: disabledPaste, icon: 'mdi-content-paste' },
      })
      const rightActions = reactive({})

      return {
        disabled,
        leftActions,
        rightActions,
        disabledPaste
      }
    },
  }
</script>
