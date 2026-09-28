'use client'
import { ConversationContextValue } from '@/interfaces'
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react'

const ConversationContext = createContext<
    ConversationContextValue | undefined
>(undefined)

export function ConversationProvider({ children }: { children: ReactNode }) {
    const [conversationId, setConversationId] = useState<string | null>(null)
    const [conversationRefreshKey, setConversationRefreshKey] = useState(0)

    const refreshConversations = () => {
        setConversationRefreshKey((currentKey) => currentKey + 1)
    }

    return (
        <ConversationContext.Provider
            value={{ conversationId, setConversationId, conversationRefreshKey, refreshConversations }}
        >
            {children}
        </ConversationContext.Provider>
    )
}

export function useConversation() {
    const context = useContext(ConversationContext)

    if (!context) {
        throw new Error(
            'useConversation must be used inside ConversationProvider',
        )
    }

    // console.log("returning context")

    return context
}