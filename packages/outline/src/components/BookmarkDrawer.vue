<template>
  <v-navigation-drawer
    app
    clipped
    mini-variant
    permanent
  >
    <v-list>
      <v-list-item-group
        v-model="selected"
        mandatory
        color="primary"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-content />
        </v-list-item>
      </v-list-item-group>
    </v-list>
    
    <template #append>
      <bookmarks-dialog />
    </template>
  </v-navigation-drawer>
</template>

<script>
  import pathify from '@/utils/pathify'
  import BookmarksDialog from './BookmarksDialog'

  export default {
    name: 'AppDrawer',

    setup(props, context) {
      const { sync } = pathify(context)
      const items = sync('bookmarks/items')
      const selected = sync('bookmarks/selected')

      return {
        items,
        selected
      }
    },

    components: {
      BookmarksDialog,
    },
  }
</script>
