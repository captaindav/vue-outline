<template>
  <v-container fluid class="main-container">
    <context-menu />

    <edit-dialog />

    <toolbar />
    
    <splitpanes class="">
      <pane size="15" min-size="15">
        <v-progress-linear
          :active="loading"
          indeterminate
        />

        <treeview
          :active.sync="active"
          :items="items"
          :load-children="loadChildren"
          :open="open"
          @update:open="setExpanded"
          v-bind="{ openMenu, treeViewLabelClick }"
        />
        
      </pane>
      <pane>
        <splitpanes horizontal>
          <pane :size="activeItem && activeItem.children && activeItem.children.length ? 20 : 0" style="overflow-y: auto">
            <v-chip-group
              v-if="activeItem && activeItem.children"
              class="px-2 py-1"
              column
            >
              <v-chip
                v-for="(child, ind) in activeItem.children || []"
                :key="`node-chip-${ind}`"
                @click="treeViewLabelClick(child, true)"
              >
                {{ child.name }}
              </v-chip>
            </v-chip-group>
          </pane>
          <pane>
            <v-row class="fill-height">
              <v-col style="height: 100%" cols="12">
                {{active}}
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
  import EditDialog from './EditDialog'
  import Treeview from './Treeview'
  import 'splitpanes/dist/splitpanes.css'

  // utilities
  import { computed, reactive } from '@vue/composition-api';
  import { difference } from 'lodash';
  import pathify from '@/utils/pathify'
  
  
  export default {
    setup(props, context) {
      const { call, get, sync } = pathify(context)
      // drawer getters
      const selectedOutlines = get('bookmarks/outlines')
      const open = get('graphql/opened')
      
      //loading getters
      const isFetchingEntries = get('graphql/isFetchingEntries')
      const isFetchingOutlines = get('graphql/isFetchingOutlines')
      const loading = computed(() => {
        return isFetchingOutlines.value || isFetchingEntries.value
      })
      
      // treeview props
      const active = sync('treeview/active')
      const activeItem = get('treeview/activeItem')
      
      // outline getters
      const toutlines = get('graphql/outlines')
      
      // actions
      const openMenu = (e, item) => {
        return call('contextMenu/openMenu', { e, item })
      }

      // init outline fetch
      call('graphql/fetchOutlines')
      const items = computed(() => {
        const outlines = selectedOutlines?.value || []
        return (!outlines.length)
          ? toutlines.value
          : toutlines.value.filter(item => outlines.includes(item.eid))
      })

      let renderedContent = reactive({ content: "" });
      const treeViewLabelClick = async (item, chip) => {
        renderedContent.content = item.rendered;
        if (chip) {
          await call('treeview/setActive', [item.eid])
        }
        await call('treeview/setActiveItem', item)
      }

      const loadChildren = async (entry) => {
        console.log('loading children for:', entry.eid)
        const childData = await call('graphql/fetchEntry', entry.eid)
        entry.children = childData.children
        return childData.children
      }

      const setExpanded = (val) => {
        const expandItems = difference(val, open.value)
        if (expandItems.length) {
          for (const item of expandItems) {
            call('graphql/expandEntry', item)
          }
        }
        
        const collapseItems = difference(open.value, val)
        if (collapseItems.length) {
          for (const item of collapseItems) {
            call('graphql/collapseEntry', item)
          }
        }
      }

      return {
        active,
        activeItem,
        items,
        loading,
        loadChildren,
        open,
        openMenu,
        renderedContent,
        setExpanded,
        treeViewLabelClick
      };
    },

    name: 'Outline',

    components : {
      ContextMenu,
      EditDialog,
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