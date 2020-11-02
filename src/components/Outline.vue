<template>
  <v-container fluid class="main-container">
    <context-menu />

    <toolbar />
    
    <splitpanes class="">
      <pane size="15" min-size="15">
        <v-progress-linear
          :active="loading"
          indeterminate
        />

        <treeview 
          :items="items"
          :load-children="loadChildren"
          :open="open"
          @update:open="setExpanded"
          v-bind="{ openMenu, treeViewLabelClick }"
        />
        
      </pane>
      <pane>
        <splitpanes horizontal>
          <pane size="20" style="overflow-y: auto">{{items}} {{open}}</pane>
          <pane>
            <v-row class="fill-height ">
              <v-col style="height: 100%" cols="12">
                <span v-html="renderedContent.content"></span>
              </v-col>
            </v-row>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
  </v-container>
  
</template>

<script>
  // components
  import { Pane, Splitpanes } from 'splitpanes'
  import Toolbar from './Toolbar'
  import ContextMenu from './ContextMenu'
  import Treeview from './Treeview'
  import 'splitpanes/dist/splitpanes.css'

  // utilities
  import { computed, reactive } from '@vue/composition-api';
  import { difference } from 'lodash';
  import pathify from '@/utils/pathify'
  
  
  export default {
    setup(props, context) {
      const { call, get } = pathify(context)
      // drawer getters
      const configItems = get('drawer/items')
      const selectedConfig = get('drawer/selected')
      const open = get('graphql/opened')
      
      //loading getters
      const isFetchingEntries = get('graphql/isFetchingEntries')
      const isFetchingOutlines = get('graphql/isFetchingOutlines')
      const loading = computed(() => {
        return isFetchingOutlines.value || isFetchingEntries.value
      })
      
      // outline getters
      const toutlines = get('graphql/outlines')
      
      // actions
      const openMenu = (e, item) => {
        return call('contextMenu/openMenu', { e, item })
      }

      // init outline fetch
      call('graphql/fetchOutlines')
      const items = computed(() => {
        const outlines = configItems.value[selectedConfig.value].outlines || []
        return (!outlines.length)
          ? toutlines.value
          : toutlines.value.filter(item => outlines.includes(item.eid))
      })

      let renderedContent = reactive({ content: "" });
      const treeViewLabelClick = (item) => {
        renderedContent.content = item.rendered;
      }

      const loadChildren = async (entry) => {
        console.log('loading children for:', entry.eid)
        const childData = await call('graphql/fetchEntry', entry.eid)
        console.log(childData)
        entry.children = childData.children
        return childData.children
      }

      const active = reactive([])

      const setExpanded = (val) => {
        const expandItems = difference(val, open)
        if (expandItems.length) {
          for (const item of expandItems) {
            // open.push(item)
            call('graphql/expandEntry', item)
          }
        }
        const collapseItems = difference(open, val)
        if (collapseItems.length) {
          for (const item of collapseItems) {
            // const ind = indexOf(open, item)
            // open.splice(ind, 1)
            call('graphql/collapseEntry', item)
          }
        }
      }

      return {
        active,
        items,
        loading,
        loadChildren,
        open,
        openMenu,
        renderedContent,
        setExpanded,
        treeViewLabelClick,
      };
    },

    name: 'Outline',

    components : {
      ContextMenu,
      Pane,
      Splitpanes,
      Toolbar,
      Treeview,
    }
  }
</script>

<style lang="sass">
  .main-container
    padding: 0px
    height: calc(100vh - 48px - 56px)
</style>