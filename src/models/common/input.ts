export interface InputProps {
    label?: string
    placeholder?: string
    isError?: boolean
    errorText?: string
    value?: any
    onChange?: (event: any) => void
    isRequired?: boolean
    isMultiline?: boolean
    onKeyDown?: (event: any) => void
    onKeyUp?: (event: any) => void
    InputProps?: any
    defaultValue?: string
    minRows?: number
}

export interface TagsInputProps {
    placeholder?: string
    tags: string[]
    setTags: any
}
