import {useState} from "react"

export const useEmailGroup = () => {

    const [isOpen, setIsOpen] = useState()


    return {
        isOpen,
        setIsOpen
    }
}