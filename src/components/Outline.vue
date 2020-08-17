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

        <v-list-item @click="addEntry">
          <v-list-item-title>Add</v-list-item-title>
        </v-list-item>

        <v-list-item @click="editEntry">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>

        <v-list-item @click="renameEntry">
          <v-list-item-title>Rename</v-list-item-title>
        </v-list-item>

        <v-list-item @click="deleteEntry">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-menu>

    <v-row class="fill-height">
      <v-col style="border-right: 2px solid #CCC" cols="3">
        <v-treeview
            activatable
            :items="treeViewItems"
            item-key="eid"
            item-text="name"
            item-children="children"
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
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { useQuery, useMutation, useResult } from '@vue/apollo-composable';  //useMutation
  import outlinesQuery from '../graphql/queries/outlines.query.gql';
  import addEntryMutation from '../graphql/mutations/addEntry.mutation.gql';
  import { computed, reactive } from '@vue/composition-api';

  export default {
    setup() {
      const {result: outlinesResult, loading } = useQuery(outlinesQuery);
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


      let renderedContent = reactive({content: ""});
      const treeViewLabelClick = (item) => {
        renderedContent.content = item.rendered;
      }

      const menu = reactive({
        show: false,
        x: 0,
        y: 0,
        menuItem: {}
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

      const { mutate: addNewEntry } = useMutation(addEntryMutation)

      const active = reactive([])

      const addEntry = () => {
        const { eid } = menu.menuItem
        if (eid) {
          console.log('Adding', eid)
          // failing for some reason
          // addNewEntry({ parentEid: eid })

          // refresh data
          // open newly created node
        }
      }

      const editEntry = () => {
        console.log('Editing', menu.menuItem)
      }

      const renameEntry = () => {
        console.log('Renaming', menu.menuItem)
      }

      const deleteEntry = () => {
        console.log('Deleting', menu.menuItem)
      }



      return {
        loading,
        outlines,
        treeViewItems,
        renderedContent,
        treeViewLabelClick,
        menu,
        active,
        openMenu,
        selectNode,
        addEntry,
        editEntry,
        renameEntry,
        deleteEntry,
        addNewEntry
      };
    },
    name: 'Outline',
  }
</script>
