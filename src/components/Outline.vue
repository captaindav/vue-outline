<template>
  <v-container fluid class="pa-0 fill-height">
    <context-menu />

    <splitpanes class="">
      <pane size="15" min-size="15">
        <v-progress-linear
          :active="loading.children || loading.init"
          indeterminate
        />
        
        <toolbar />
        
        <v-treeview
          :items="treeViewItems2"
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
          <pane size="20" style="overflow-y: auto">{{treeViewItems}}</pane>
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

  // queries
  import outlinesQuery from '../graphql/outline/queries/outlines.query.gql';
  import entryQuery from '../graphql/outline/queries/entry.query.gql';

  // utilities
  import { useQuery } from '@vue/apollo-composable';
  import { computed, reactive } from '@vue/composition-api';
  import { difference, indexOf } from 'lodash';
  import pathify from '@/utils/pathify'
  
  
  export default {
    setup(props, context) {
      const { call, get } = pathify(context)
      const configItems = get('drawer/items')
      const selectedConfig = get('drawer/selected')
      const test = call('graphql/fetchOutlines')
      
      const openMenu = (e, item) => {
        return call('contextMenu/openMenu', { e, item })
      }

      const testOut = get('graphql/outlines')
      console.log(testOut, test)

      const testEntry = get('graphql/entries')
      const entry = call('graphql/fetchEntry', 3)
      console.log(testEntry, entry)

      const treeViewItems = reactive([])
      // dynamic configurations
      const treeViewItems2 = computed(() => {
        const outlines = configItems.value[selectedConfig.value].outlines || []
        return (!outlines.length)
          ? treeViewItems
          : treeViewItems.filter(item => outlines.includes(item.eid))
      })

      // get initial outlines query and extract root entries
      const open = reactive([])
      const availableOutlines = reactive([])
      
      let genResults = false
      const { loading: init, onResult } = useQuery(outlinesQuery)
      const loading = reactive({
        children: false,
        init
      })

      onResult(async result => {
        const { data: { outlines: { outlines } } } = result
        const items = []
        const opened = []
        loading.children = true
        for (const outline of outlines) {
          const { rootEntry } = outline
          availableOutlines.push(rootEntry.eid)
          const childData = await getChildren({ ...rootEntry, children: [] }, opened, false)
          items.push({ ...rootEntry, children: childData.children })
        }
        treeViewItems.push(...items)
        loading.children = false
        open.push(...opened)
      })

      // get children entry query
      const { refetch } = useQuery(entryQuery)
      const getChildren = async (entry, opened, single = true) => {
        console.log('fetching children for:', entry.eid)

        if (!entry.expanded && !single) return { children: [], opened }
        if (entry.expanded) {
          opened.push(entry.eid)
        }

        const entries = await Promise.all([refetch({ eid: entry.eid })])
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
        //selectedEntry = item;
      }

      const loadChildren = async (entry) => {
        const opened = []
        const childData = await getChildren(entry, opened, true)
        open.push(...opened)
        return childData.children
      }

      const selectNode = () => {
        console.log('Selecting')
        // treeViewLabelClick(menu.menuItem)
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
        availableOutlines,
        genResults,
        loadChildren,
        loading,
        open,
        openMenu,
        renderedContent,
        selectNode,
        setExpanded,
        treeViewItems,
        treeViewItems2,
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