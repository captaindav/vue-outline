<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
  >
    <template #activator="{ on: don, attrs: dattrs }">
      <v-tooltip right>
        <template #activator="{ on: tton, attrs: ttattrs }">
          <v-list-item
            v-bind="{
              ...dattrs,
              ...ttattrs
            }"
            v-on="{
              ...don,
              ...tton
            }"
          >
            <v-list-item-icon>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-content />
          </v-list-item>
        </template>
        <span>Bookmark Manager</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title class="py-2">
        Bookmark Manager
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
</template>

<script>
  import { reactive } from '@vue/composition-api'

  export default {
    name: 'OutlineBookmarks',

    setup() {
      let dialog = false
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
    }
  }
</script>