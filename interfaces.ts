type Role = "user" | "assiatant"

export interface ChatInterfaceProps {
    documents: { name: string; meta: string; color: string }[]
    handleSignIn: () => void
}

export interface Conversation {
    conversation_id: string
    user_id: string
    title: string
    created_at: string
}

export interface Message {
    message_id: string
    conversation_id: string
    role: Role
    query: string
    content: string
    created_at: string
}
export interface Messages {
    documents: { name: string; meta: string; color: string }[]
    // messages: Message[]
}

export interface ConversationContextValue {
    conversationId: string | null
    setConversationId: (conversationId: string | null) => void
    conversationRefreshKey: number
    refreshConversations: () => void
}

export interface MessageContextValue {
    query: string
    setQuery: (query: string | null) => void
}