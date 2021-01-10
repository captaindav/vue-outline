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
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Outline Servers</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title class="py-2">
        Outline Servers
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
        <v-toolbar dense>
          <v-tooltip
            v-for="(action, sa) in actions"
            :key="`sa-${sa}`"
            bottom
          >
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                v-on="{
                  ...on,
                  click: action.click
                }"
                :disabled="sa !== 'add' && !(selected >= 0)"
                icon
                fab
                small
              >
                <v-icon v-text="action.icon" />
              </v-btn>
            </template>
            <span class="text-capitalize">{{sa}} Server</span>
          </v-tooltip>
        </v-toolbar>
        
        <v-list>
          <v-list-item-group v-model="selected">
            <v-list-item
              v-for="(server, si) in servers"
              :key="`oi-${si}`"
            >
              <v-list-item-content>
                <v-list-item-title>{{server.name}}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon
                  v-if="server.disabled"
                  color="error"
                >mdi-cancel</v-icon>
                <v-icon
                  v-if="!server.disabled"
                  color="success"
                >mdi-check</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import pathify from '@/utils/pathify'

  export default {
    name: 'ServerDialog',

    setup(props, context) {
      let dialog = false
      const { sync } = pathify(context)
      const selected = sync('auth/selected')
      const servers = sync('auth/servers')

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