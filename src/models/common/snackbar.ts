export interface SnackbarProps {
    open: boolean
    onClose: () => void
    message: string
    withAutoHide?: boolean
}
