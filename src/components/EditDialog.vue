<template>
  <v-dialog
    v-model="edit"
    persistent
  >
    <v-card min-height="500px">
      <v-card-title>
        {{ src }}
        <v-spacer />
        <v-btn
          icon
          @click="edit = !edit"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="fill-height">
        <vue-friendly-iframe
          v-if="edit && src"
          :src="src"
          @load="onLoad"
        />
        <iframe :src="src"></iframe>
      </v-card-text>
    </v-card>
    
  </v-dialog>
</template>

<script>
  import { computed } from '@vue/composition-api'
  import pathify from '@/utils/pathify'
  import { VueFriendlyIframe } from 'vue-friendly-iframe'

  export default {
    setup(props, context) {
      const { get, sync } = pathify(context)
      const menuItem = get('contextMenu/menuItem')
      const edit = sync('contextMenu/edit')

      const src = computed(() => {
        const { eid } = menuItem.value
        const url = 'http://drupal-outline.lndo.site'
        return eid ? `${url}/outline/entry/${eid}/edit` : ''
      })

      const onLoad = () => {
        console.log('loaded')
      }

      return {
        edit,
        onLoad,
        src
      }
    },

    components : {
      VueFriendlyIframe
    }
  }
</script>