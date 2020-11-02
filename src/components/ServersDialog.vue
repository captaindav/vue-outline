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
        <span>Configure Servers</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>
        Configure Servers
        <v-spacer />
        <v-btn
          fab
          icon
          @click="dialog = !dialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-list>
          <v-list-item-group multiple>
            <v-list-item
              v-for="outline in servers"
              :key="`oi-${outline.eid}`"
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    color="primary"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{outline.name}}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { reactive } from '@vue/composition-api'

  export default {
    name: 'ServerDialog',

    setup() {
      let dialog = false
      const servers = reactive([
        {
          eid: 1,
          name: 'Server 1',
          active: true,
        },
        {
          eid: 2,
          name: 'Server 2',
          active: false,
        },
      ])

      return {
        dialog,
        servers,
      }
    }
  }
</script>