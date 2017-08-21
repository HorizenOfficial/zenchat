export const HANDLE_DIALOG_CLOSE = 'HANDLE_DIALOG_CLOSE'
export const HANDLE_DIALOG_OPEN = 'HANDLE_DIALOG_OPEN'

export function handleDialogOpen () {
  return {
    type: HANDLE_DIALOG_OPEN,
    dialogOpen: true
  }
}

export function handleDialogClose () {
  return {
    type: HANDLE_DIALOG_CLOSE,
    dialogOpen: false
  }
}