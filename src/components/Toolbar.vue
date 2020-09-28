<template>
  <v-toolbar color="transparent" dense>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
    >
      <template v-slot:activator="{ on }">
        <v-toolbar-items>
          <v-btn text v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </v-toolbar-items>
      </template>
      <v-card>
        <v-card-title>
          Configure Outlines
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
                v-for="outline in outlines"
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
  </v-toolbar>
</template>

<script>
  import { reactive } from '@vue/composition-api'
  import { outlinesQuery } from "./../graphql/queries.js";

  export default {
    name: 'Toolbar',

    setup() {
      const dialog = false
      const outlines = reactive([
        {
          eid: 1,
          name: 'Outline 1',
          active: true,
        },
        {
          eid: 2,
          name: 'Outline 2',
          active: false,
        },
      ])

      return {
        dialog,
        outlines,
      }
    },

    apollo: {
      outlines2: {
        query: outlinesQuery
      }
    },
  }
</script>
