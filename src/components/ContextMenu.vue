<template>
  <v-menu
    v-model="show"
    :position-x="x"
    :position-y="y"
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

      <v-list-item disabled @click="renameEntry">
        <v-list-item-title>Rename</v-list-item-title>
      </v-list-item>

      <v-list-item @click="deleteEntry">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>

      <v-list-item @click="cutEntry">
        <v-list-item-title>Cut</v-list-item-title>
      </v-list-item>

      <v-list-item disabled @click="copyEntry">
        <v-list-item-title>Copy</v-list-item-title>
      </v-list-item>

      <v-list-item
        :disabled="cutItem && !cutItem.value"
        @click="pasteEntry"
      >
        <v-list-item-title>Paste</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import pathify from '@/utils/pathify'
  
  export default {
    setup(props, context) {
      const { call, get, sync } = pathify(context)
      const show = sync('contextMenu/show')
      const x = get('contextMenu/x')
      const y = get('contextMenu/y')
      let menuItem = sync('contextMenu/menuItem')
      let cutItem = sync('contextMenu/cutItem')

      const addEntry = () => {
        const { eid: parentEid } = menuItem.value
        return call('graphql/addEntry', parentEid)
      }

      const copyEntry = () => {
        console.log('Copy', menuItem)
      }

      const cutEntry = () => {
        console.log('Cut', menuItem)
        cutItem = menuItem
      }

      const deleteEntry = () => {
        // replace with vue/vuetify dialog
        const { eid } = menuItem.value
        const confirm = window.confirm(`Are you sure you want to delete ${eid}`)
        if (confirm && eid) {
          call('graphql/deleteEntry', eid)
        }
      }

      const editEntry = () => {
        const { eid } = menuItem.value
        if (eid) {
          const url = 'http://drupal-outline.lndo.site'
          window.open(`${url}/outline/entry/${eid}/edit`, '_blank')
        }
      }
      
      const renameEntry = () => {
        const { eid } = menuItem.value
        return call('graphql/renameEntry', eid)
      }
      
      const pasteEntry = () => {
        console.log('Paste', menuItem.value, cutItem.value)
        const { eid } = cutItem.value
        const { eid: parentEid } = menuItem.value
        if (!eid || !parentEid) return
        setParentEntry(eid, parentEid)
      }
      
      const setParentEntry = (eid, parentEid) => {
        call('graphql/setParentEntry', { eid, parentEid })
      }
      
      return {
        addEntry,
        copyEntry,
        cutItem,
        cutEntry,
        deleteEntry,
        editEntry,
        pasteEntry,
        renameEntry,
        show,
        x,
        y,
      }
    }
  }
</script>