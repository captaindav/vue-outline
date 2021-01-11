<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
  >
    <template #activator="{ on: don, attrs: dattrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tton, attrs: ttattrs }">
          <v-btn
            icon
            v-bind="{
              ...dattrs,
              ...ttattrs
            }"
            v-on="{
              ...don,
              ...tton
            }"
          >
            <v-icon>mdi-book-plus</v-icon>
          </v-btn>
        </template>
        <span>Open Outline</span>
      </v-tooltip>
    </template>
    <v-card height="600px">
      <v-card-title class="py-2">
        Outlines
        <v-spacer />
        <v-btn
          fab
          icon
          small
          @click="dialog = !dialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-0">
        <treeview
          open-all
          :items="[
            { eid: 1, name: 'Server 1', children: [{ eid: 3, name: 'Outline 1' }] },
            { eid: 2, name: 'Server 2', children: [{ eid: 4, name: 'Outline 2' }] },
          ]"
        />
       
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import pathify from '@/utils/pathify'
  import Treeview from './Treeview'

  export default {
    name: 'OutlineDialog',

    components: {
      Treeview
    },

    setup(props, context) {
      let dialog = false
      const { sync } = pathify(context)
      const selected = sync('servers/selected')
      const servers = sync('servers/servers')

      const addServer = () => {
        servers.value.push({ name: 'Server 1', uri: '', disabled: false })
        selected.value = undefined
      }

      const deleteServer = () => {
        servers.value.splice(selected.value, 1)
        selected.value = undefined
      }

      const disableServer = () => {
        servers.value[selected.value].disabled = true
      }

      const enableServer = () => {
        servers.value[selected.value].disabled = false
      }

      const actions = {
        add: { click: addServer, icon: 'mdi-plus' },
        edit: { click: () => {}, icon: 'mdi-pencil' },
        delete: { click: deleteServer, icon: 'mdi-delete' },
        disable: { click: disableServer, icon: 'mdi-cancel' },
        enable: { click: enableServer, icon: 'mdi-check' },
      }

      return {
        actions,
        servers,
        selected,
        dialog,
      }
    }
  }
</script>