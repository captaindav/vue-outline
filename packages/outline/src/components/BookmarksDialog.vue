<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
  >
    <template #activator="{ on: don, attrs: dattrs }">
      <v-tooltip right>
        <template #activator="{ on: tton, attrs: ttattrs }">
          <v-list-item
            v-bind="{
              ...dattrs,
              ...ttattrs
            }"
            v-on="{
              ...don,
              ...tton
            }"
          >
            <v-list-item-icon>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-icon>

            <v-list-item-content />

          </v-list-item>
        </template>

        <span>Bookmark Manager</span>
      </v-tooltip>
    </template>

    <v-card height="700px">
      <v-card-title class="py-2">
        Bookmark Manager

        <v-spacer />

        <v-btn
          fab
          icon
          small
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text
        v-if="!edit"
        class="pa-0"
      >
        <v-toolbar
          class="px-2"
          dense
        >
          <v-tooltip
            v-for="(bAction, ba) in bookmarkActions"
            :key="`ba-${ba}`"
            bottom
          >
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                v-on="{
                  ...on,
                  click: bAction.click
                }"
                :disabled="ba !== 'add' && selected === undefined"
                icon
                fab
                small
              >
                <v-icon v-text="bAction.icon" />
              </v-btn>
            </template>
            <span class="text-capitalize">{{ba}} Bookmark</span>
          </v-tooltip>
        </v-toolbar>
        
        <v-list
          height="594px"
          style="overflow-y: auto"
        >
          <v-list-item-group v-model="selected">
            <v-list-item
              v-for="(bookmark, bi) in bookmarks"
              :key="`oi-${bi}`"
            >
              <v-list-item-icon>
                <v-icon>{{bookmark.icon}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{bookmark.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>

      <v-card-text
        v-if="edit"
        class="pa-0"
      >
        <v-toolbar
          class="px-2"
          dense
        >
          <v-tooltip
            v-for="(eAction, ea) in editActions"
            :key="`ea-${ea}`"
            bottom
          >
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                v-on="{
                  ...on,
                  click: eAction.click
                }"
                icon
                fab
                small
              >
                <v-icon v-text="eAction.icon" />
              </v-btn>
            </template>
            <span class="text-capitalize">{{ea}} Bookmark</span>
          </v-tooltip>
        </v-toolbar>

        <v-form class="pa-6 pb-0">
          <v-row>
            <v-col cols="2">
              <v-select
                v-model="editItem.icon"
                :items="icons"
                append-icon=""
                label="Icon"
                outlined
              >
                <template #selection="{ item }">
                  <v-icon>{{ item }}</v-icon>
                </template>
                <template #item="{ item }">
                  <v-icon>{{ item }}</v-icon>
                </template>
              </v-select>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="editItem.name"
                label="Name"
                outlined
              />
            </v-col>
          </v-row>
        </v-form>

        <v-treeview
          v-model="editItem.outlines"
          :items="outlines"
          open-all
          selectable
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import pathify from '@/utils/pathify'
  import { reactive, ref } from '@vue/composition-api'

  export default {
    name: 'OutlineBookmarks',

    setup(props, context) {
      const dialog = ref(false)
      const edit = ref(false)
      const isNew = ref(false)
      const { sync } = pathify(context)
      const bookmarks = sync('bookmarks/bookmarks')
      const selected = sync('bookmarks/selected')

      const addBookmark = () => {
        isNew.value = true
        edit.value = true
      }

      const cancel = () => {
        edit.value = false
        editItem = Object.assign(editItem, editDefault)
      }

      const close = () => {
        edit.value = false
        dialog.value = false
        selected.value = undefined
      }

      const deleteBookmark = () => {
        bookmarks.value.splice(bookmarks.value, 1)
        selected.value = undefined
      }

      const editBookmark = () => {
        const bookmark = bookmarks.value[selected.value]
        editItem = Object.assign(editItem, bookmark)
        edit.value = true
      }

      const editDefault = {
        icon: '',
        name: '',
        outlines: [],
      }

      let editItem = reactive({
        icon: '',
        name: '',
        outlines: [],
      })

      const icons = [
        'mdi-file',
        'mdi-file-alert',
        'mdi-file-chart',
      ]

      const outlines = [
        {
          id: 's1',
          name: 'Server 1',
          children: [
            { id: 1, name: 'Outline 1' },
            { id: 3, name: 'Outline 2' },
          ],
        }
      ]

      const save = () => {
        const saveItem = Object.assign({}, editItem)
        if (isNew.value) {
          bookmarks.value.push(saveItem)
          isNew.value = false
          selected.value = undefined
        } else {
          bookmarks.value.splice(selected.value, 1, saveItem)
        }
        cancel()
      }

      const bookmarkActions = {
        add: { click: addBookmark, icon: 'mdi-plus' },
        edit: { click: editBookmark, icon: 'mdi-pencil' },
        delete: { click: deleteBookmark, icon: 'mdi-delete' },
      }

      const editActions = {
        save: { click: save, icon: 'mdi-content-save' },
        cancel: { click: cancel, icon: 'mdi-cancel' },
      }
      
      return {
        bookmarkActions,
        bookmarks,
        close,
        edit,
        editActions,
        editItem,
        dialog,
        icons,
        isNew,
        outlines,
        selected,
      }
    }
  }
</script>