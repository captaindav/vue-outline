<template>
  <v-navigation-drawer
    app
    clipped
    link
    mini-variant
    permanent
  >
    <div class="pt-2">
      <v-btn
        v-for="item in items"
        :key="item.title"
        block
        text
        tile
      >
        <v-icon v-text="item.icon" />
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import pathify from '@/utils/pathify'

  export default {
    name: 'AppDrawer',

    setup(props, context) {
      const { sync } = pathify(context)
      const items = sync('drawer/items')

      return {
        items
      }
    },

  }
</script>
