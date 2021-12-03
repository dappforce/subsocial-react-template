import { useState } from 'react'

export const useModal = () => {
    const [ isVisible, setIsVisible ] = useState(false)

    const toggleModal = () => {
        setIsVisible(!isVisible)
    }

    return {
        isVisible,
        toggleModal,
    }
}
