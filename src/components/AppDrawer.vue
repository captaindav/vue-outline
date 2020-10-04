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
  </v-navigation-drawer>
</template>

<script>
  import pathify from '@/utils/pathify'

  export default {
    name: 'AppDrawer',

    setup(props, context) {
      const { sync } = pathify(context)
      const items = sync('drawer/items')
      const selected = sync('drawer/selected')

      return {
        items,
        selected
      }
    },

  }
</script>
