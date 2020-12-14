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

      <v-card-text class="pa-0">
        <v-toolbar dense>
          <v-tooltip
            v-for="(action, ba) in actions"
            :key="`ba-${ba}`"
            bottom
          >
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                v-on="{
                  ...on,
                  click: action.click
                }"
                :disabled="ba !== 'add' && !(selected >= 0)"
                icon
                fab
                small
              >
                <v-icon v-text="action.icon" />
              </v-btn>
            </template>
            <span class="text-capitalize">{{ba}} Bookmark</span>
          </v-tooltip>
        </v-toolbar>
        
        <v-list>
          <v-list-item-group v-model="selected">
            <v-list-item
              v-for="(bookmark, bi) in bookmarks"
              :key="`oi-${bi}`"
            >
              <v-list-item-icon>
                <v-icon>{{bookmark.icon}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{bookmark.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import pathify from '@/utils/pathify'
  import { ref } from '@vue/composition-api'

  export default {
    name: 'OutlineBookmarks',

    setup(props, context) {
      const { sync } = pathify(context)
      const selected = ref(undefined)
      const bookmarks = sync('bookmarks/bookmarks')
      let dialog = false

      const deleteBookmark = () => {
        bookmarks.value.splice(bookmarks.value, 1)
        selected.value = undefined
      }

      const actions = {
        add: { click: () => {}, icon: 'mdi-plus' },
        edit: { click: () => {}, icon: 'mdi-pencil' },
        delete: { click: deleteBookmark, icon: 'mdi-delete' },
      }
      
      return {
        actions,
        bookmarks,
        dialog,
        selected,
      }
    }
  }
</script>