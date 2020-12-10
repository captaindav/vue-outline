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
      <v-card-text>
        <v-list>
          <v-list-item-group
            v-model="active"
            multiple
          >
            <v-list-item
              v-for="server in available"
              :key="`oi-${server.sid}`"
              :disabled="server.disabled"
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    color="primary"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{server.name}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action v-if="server.disabled">
                  <v-icon>mdi-cancel</v-icon>
                </v-list-item-action>
              </template>
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
      const available = sync('auth/availableServers')
      const active = sync('auth/activeServers')

      return {
        active,
        available,
        dialog,
      }
    }
  }
</script>