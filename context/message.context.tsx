'use client'
import { MessageContextValue } from '@/interfaces'
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'

const MessageContext = createContext<
    MessageContextValue | undefined
>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
    const [query, setQuery] = useState<string>('')

    const updateQuery = (query: string | null) => {
        setQuery(query ?? '')
    }

    return (
        <MessageContext.Provider
            value={{ query, setQuery: updateQuery }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export function useMessage() {
    const context = useContext(MessageContext)

    if (!context) {
        throw new Error(
            'useMessage must be used inside MessageProvider',
        )
    }

    // console.log("returning context")

    return context
}