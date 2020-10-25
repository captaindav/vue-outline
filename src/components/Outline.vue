<template>
  <v-container fluid class="pa-0 fill-height">
    <context-menu />

    <splitpanes class="">
      <pane size="15" min-size="15">
        <v-progress-linear
          :active="loading"
          indeterminate
        />
        
        <toolbar />
        
        <v-treeview
          :items="items"
          :load-children="loadChildren"
          :open="open"
          activatable
          item-key="eid"
          item-text="name"
          item-children="children"
          open-on-click
          transition
          @update:open="setExpanded"
        >
          <template v-slot:label="{ item, open }">
            <div
              @click="treeViewLabelClick(item)"
              @contextmenu="openMenu($event, item)"
            >
              <v-icon v-if="item.parentEid">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                $outline
              </v-icon>
              <span>{{item.name}}</span>
            </div>
          </template>
        </v-treeview>
      </pane>
      <pane>
        <splitpanes horizontal>
          <pane size="20" style="overflow-y: auto">{{items}}</pane>
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
  import 'splitpanes/dist/splitpanes.css'

  // utilities
  import { computed, reactive } from '@vue/composition-api';
  import { difference, indexOf } from 'lodash';
  import pathify from '@/utils/pathify'
  
  
  export default {
    setup(props, context) {
      const { call, get } = pathify(context)
      // drawer getters
      const configItems = get('drawer/items')
      const selectedConfig = get('drawer/selected')
      
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

      const open = reactive([])
      
      // get children entry query
      const getChildren = async (entry, opened, single = true) => {
        console.log('fetching children for:', entry.eid)

        if (!entry.expanded && !single) return { children: [], opened }
        if (entry.expanded) {
          opened.push(entry.eid)
        }

        const entries = await call('graphql/fetchEntry', entry.eid)
        if (!entries[0] || entries[0].errors) return { children: [], opened }

        const children = entries[0].data.entry.children || []
        if (children.length) {
          for ( const child of children) {
            const childData = await getChildren({ ...child, children: [] }, opened, single)
            entry.children.push({ ...child, children: childData.children })
          }
        }
        else entry.children = undefined
        return { children: entry.children, opened }
      }

      let renderedContent = reactive({ content: "" });
      const treeViewLabelClick = (item) => {
        renderedContent.content = item.rendered;
      }

      const loadChildren = async (entry) => {
        const opened = []
        const childData = await getChildren(entry, opened, true)
        open.push(...opened)
        return childData.children
      }

      const active = reactive([])

      const setExpanded = (val) => {
        const expandItems = difference(val, open)
        if (expandItems.length) {
          for (const item of expandItems) {
            open.push(item)
            call('graphql/expandEntry', item)
          }
        }
        const collapseItems = difference(open, val)
        if (collapseItems.length) {
          for (const item of collapseItems) {
            const ind = indexOf(open, item)
            open.splice(ind, 1)
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
    }
  }
</script>