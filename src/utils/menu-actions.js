import { computed } from '@vue/composition-api'
import pathify from '@/utils/pathify'

export function getMenuActions (context) {
  const { call, get, sync } = pathify(context)
  const show = sync('contextMenu/show')
  const x = get('contextMenu/x')
  const y = get('contextMenu/y')
  let cutItem = sync('contextMenu/cutItem')
  let edit = sync('contextMenu/edit')
  let menuItem = sync('contextMenu/menuItem')

  const addEntry = () => {
    const { eid: parentEid } = menuItem.value
    return call('graphql/addEntry', parentEid)
  }

  const copyEntry = () => {
    console.log('Copy', menuItem)
  }

  const cutEntry = () => {
    console.log('Cut', menuItem)
    cutItem.value = menuItem
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
    edit.value = true
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

  const pasteDisabled = computed(() => {
    console.log(cutItem, !cutItem.value)
    return cutItem && !cutItem.value
  })
  
  return {
    addEntry,
    copyEntry,
    cutItem,
    cutEntry,
    deleteEntry,
    edit,
    editEntry,
    pasteEntry,
    pasteDisabled,
    renameEntry,
    show,
    x,
    y,
  }
}