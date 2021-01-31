import { computed } from '@vue/composition-api'
import pathify from '@/utils/pathify'

export function getMenuActions (context) {
  const { call, get, sync } = pathify(context)
  const show = sync('contextMenu/show')
  const x = get('contextMenu/x')
  const y = get('contextMenu/y')
  let cutItem = sync('treeview/cutItem')
  let edit = sync('contextMenu/edit')
  let activeItem = sync('treeview/activeItem')

  const addEntry = () => {
    const { eid: parentEid, server } = activeItem.value
    return call('graphql/addEntry', { parentEid, server })
  }

  const closeOutline = () => {
    console.log('Close Outline')
    return true
  }

  const copyEntry = () => {
    console.log('Copy', activeItem)
  }

  const cutEntry = () => {
    console.log('Cut', activeItem)
    cutItem.value = activeItem.value
  }

  const deleteEntry = () => {
    // replace with vue/vuetify dialog
    const { eid, server } = activeItem.value
    const confirm = window.confirm(`Are you sure you want to delete ${eid}`)
    if (confirm && eid) {
      call('graphql/deleteEntry', { eid, server })
    }
  }

  const editEntry = () => {
    edit.value = true
  }
  
  const renameEntry = () => {
    const { eid, server } = activeItem.value
    return call('graphql/renameEntry', { eid, server })
  }
  
  const pasteEntry = () => {
    const { eid } = cutItem.value
    const { eid: parentEid, server } = activeItem.value
    console.log('Paste', eid, parentEid)
    if (!eid || !parentEid) return
    setParentEntry(eid, parentEid, server)
  }
  
  const setParentEntry = (eid, parentEid, server) => {
    call('graphql/setParentEntry', { eid, parentEid, server })
  }

  const disabled = computed(() => {
    return activeItem && !activeItem.value
  })

  const disabledPaste = computed(() => {
    return cutItem && !cutItem.value
  })
  
  return {
    addEntry,
    closeOutline,
    copyEntry,
    cutItem,
    cutEntry,
    deleteEntry,
    disabled,
    disabledPaste,
    edit,
    editEntry,
    pasteEntry,
    renameEntry,
    show,
    x,
    y,
  }
}