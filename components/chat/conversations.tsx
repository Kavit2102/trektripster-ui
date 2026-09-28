import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Conversation } from "@/interfaces";
import { getConversations } from "@/api/conversation.api";
import { History, MessageSquareText } from "lucide-react";
import { useConversation } from "@/context/conversation.context";
import NewConversation from "./new-conversation";

export default function Conversations() {

    const { userId } = useAuth()
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { conversationId, setConversationId, conversationRefreshKey } = useConversation()

    function formatDate(value: string) {
        const date = new Date(value)

        if (Number.isNaN(date.getTime())) return ''

        return new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date)
    }

    const loadConversations = useCallback(async () => {
        if (!userId) {
            setConversations([])
            return
        }

        setIsLoading(true)

        try {
            const response = await getConversations(userId)
            const records = Array.isArray(response)
                ? response
                : response?.conversations ?? response?.data ?? []

            setConversations(records)
        } catch {
            setConversations([])
        } finally {
            setIsLoading(false)
        }
    }, [userId, conversationRefreshKey])

    useEffect(() => {
        loadConversations()
    }, [loadConversations])

    return (
        <aside className="flex min-h-0 w-full flex-col overflow-hidden rounded-tl-2xl border-r bg-background md:w-56 md:shrink-0 lg:w-60">
            <header className="flex shrink-0 items-center gap-2.5 border-b border-border px-4 py-4">
                <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <History className="size-4" />
                </span>

                <div>
                    <p className="text-sm font-semibold">History</p>
                    <p className="text-[11px] text-muted-foreground">
                        Your recent conversations
                    </p>
                </div>
                <NewConversation />
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto p-2">
                {isLoading ? (
                    <p className="px-3 py-4 text-xs text-muted-foreground">
                        Loading conversations...
                    </p>
                ) : conversations.length > 0 ? (
                    <div role="list" aria-label="Conversation history" className="space-y-1">
                        {conversations?.map((conversation) => {
                            const isActive = conversationId === conversation.conversation_id

                            return (
                                <button
                                    key={conversation?.conversation_id}
                                    onClick={() => setConversationId(conversation?.conversation_id)}
                                    type="button"
                                    role="listitem"
                                    aria-pressed={isActive}
                                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition cursor-pointer ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground hover:bg-secondary"
                                        }`}
                                >
                                    <MessageSquareText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-xs font-medium">
                                            {conversation?.title || 'New Chat'}
                                        </span>

                                        <span className="mt-1 block text-[10px] text-muted-foreground">
                                            {formatDate(conversation?.created_at)}
                                        </span>
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                ) : (
                    <p className="px-3 py-4 text-xs text-muted-foreground">
                        No conversations yet.
                    </p>
                )}
            </div>
        </aside>
    )
}
