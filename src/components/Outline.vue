<template>
  <v-container fluid class="py-0 fill-height">
    <v-menu
      v-model="menu.show"
      :position-x="menu.x"
      :position-y="menu.y"
      absolute
      offset-y
    >
      <v-list>

        <v-list-item @click="addEntryCommand">
          <v-list-item-title>Add</v-list-item-title>
        </v-list-item>

        <v-list-item @click="editEntryCommand">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>

        <v-list-item @click="renameEntryCommand">
          <v-list-item-title>Rename</v-list-item-title>
        </v-list-item>

        <v-list-item @click="deleteEntryCommand">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>

        <v-list-item @click="cutEntryCommand">
          <v-list-item-title>Cut</v-list-item-title>
        </v-list-item>

        <v-list-item @click="copyEntryCommand">
          <v-list-item-title>Copy</v-list-item-title>
        </v-list-item>

        <v-list-item @click="pasteEntryCommand">
          <v-list-item-title>Paste</v-list-item-title>
        </v-list-item>

      </v-list>

    </v-menu>

    <v-row class="fill-height">
      <v-col style="border-right: 2px solid #CCC" cols="3">
        <v-treeview
            activatable
            open-on-click
            :items="treeViewItems"
            item-key="eid"
            item-text="name"
            item-children="children"
            @update:open="onOpen"
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
      </v-col>
      <v-col cols="9">
        <v-row  class="fill-height">
          <v-col v-if="false" style="border-bottom: 2px solid #CCC; height: 50%" cols="12">
            Entries
          </v-col>
          <v-col style="height: 100%" cols="12">
            <span v-html="renderedContent.content"></span>
            <span>{{treeViewItems}}</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { useQuery, useMutation, useResult } from '@vue/apollo-composable';
  import outlinesQuery from '../graphql/outline/queries/outlines.query.gql';
  import entryQuery from '../graphql/outline/queries/entry.query.gql';
  import { addEntry as addEntryMutation } from '../graphql/entry/mutations/addEntry.mutation.gql';
  import { deleteEntry as deleteEntryMutation } from '../graphql/entry/mutations/deleteEntry.mutation.gql';
  import { renameEntry as renameEntryMutation } from '../graphql/entry/mutations/renameEntry.mutation.gql';
  import { expandEntry as expandMutation } from '../graphql/entry/mutations/expand.mutation.gql';
  import { collapse as collapseMutation } from '../graphql/entry/mutations/collapse.mutation.gql';
  import { computed, reactive } from '@vue/composition-api';

  export default {
    setup() {
      const { result: outlinesResult, loading } = useQuery(outlinesQuery)

      const outlines = useResult(
              outlinesResult,
              null,
              data => data.outlines.outlines);

      const treeViewItems = computed(() =>  {
        const rootEntries = [];
        if (outlines && outlines.value) {
          for (const outline of outlines.value) {
            rootEntries.push(outline.rootEntry);
          }
        }
        return rootEntries;
      });

      const { refetch } = useQuery(entryQuery)

      let renderedContent = reactive({content: ""});
      const treeViewLabelClick = (item) => {
        renderedContent.content = item.rendered;
        //selectedEntry = item;
      }

      const menu = reactive({
        show: false,
        x: 0,
        y: 0,
        menuItem: {},
        cutItem:{}
      })

      const openMenu = (event, item) => {
        event.preventDefault()
        menu.show = false
        menu.x = event.clientX
        menu.y = event.clientY
        menu.menuItem = item
        menu.show = true
      }

      const selectNode = () => {
        console.log('Selecting')
        treeViewLabelClick(menu.menuItem)
      }

      const active = reactive([])

      // Add entry.
      const { mutate: addEntry } = useMutation(addEntryMutation)
      const addEntryCommand = () => {
        const { eid } = menu.menuItem
        if (eid) {
          console.log('Adding', eid);
          addEntry({ parentEid: eid })

          // refresh data

          // open newly created node
        }
      }

      // Edit entry
      const editEntryCommand = () => {
        const { eid } = menu.menuItem
        if (eid) {
          const url = 'http://drupal-outline.lndo.site'
          window.open(`${url}/outline/entry/${menu.menuItem.eid}/edit`, '_blank')
        }
      }

      // Rename entry
      const { mutate: renameEntry } = useMutation(renameEntryMutation)
      const renameEntryCommand = () => {
        const { eid } = menu.menuItem
        if (eid) {
          console.log('Adding', eid);
          renameEntry({ parentEid: eid })

        }
      }

      // Delete entry.
      const { mutate: deleteEntry } = useMutation(deleteEntryMutation)
      const deleteEntryCommand = () => {
        const { eid } = menu.menuItem
        if (eid) {
          console.log('Adding', eid);
          deleteEntry({ eid })
        }
      }

      // Expand entry.
      const { mutate: expandEntry } = useMutation(expandMutation)
      const expandEntryCommand = (eid) => {
        console.log('expanding', eid);
        expandEntry({ eid })
      }

      // Collapse entry.
      const { mutate: collapseEntry } = useMutation(collapseMutation)
      const collapseEntryCommand = (eid) => {
        console.log('Adding', eid);
        collapseEntry({ eid })
      }

      const cutEntryCommand = () => {
        console.log('Cut', menu.menuItem)
        menu.cutItem = menu.menuItem
      }

      const copyEntryCommand = () => {
        console.log('Copy', menu.menuItem)
      }

      const pasteEntryCommand = () => {
        console.log('Paste', menu.menuItem)
      }

      const onOpen = async (ids) => {
        const opened = ids.pop()
        console.log('opened', opened)

        if (opened) {
          console.log('fetching', opened)
          expandEntryCommand(opened)
          const entry = await Promise.all([refetch({eid: opened})])
          if (entry[0] && !entry[0].errors) {
            const entryData = entry[0].data.entry
            if (entryData.children) {
              for ( const child of entryData.children) {
                //if has children
                child.children = [{}]
              }
            }
            console.log(entryData)
          }
        }
        console.log(opened)

      }

      return {
        onOpen,
        active,
        loading,
        menu,
        openMenu,
        outlines,
        renderedContent,
        selectNode,
        treeViewItems,
        treeViewLabelClick,
        addEntryCommand,
        editEntryCommand,
        renameEntryCommand,
        deleteEntryCommand,
        expandEntryCommand,
        collapseEntryCommand,
        cutEntryCommand,
        copyEntryCommand,
        pasteEntryCommand
      };
    },
    name: 'Outline',
  }
</script>
