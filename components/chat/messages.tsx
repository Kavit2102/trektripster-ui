import { addMessage, getMessages } from "@/api/message.api";
import { useConversation } from "@/context/conversation.context";
import { type Message, type Messages } from "@/interfaces";
import { useAuth } from "@clerk/nextjs";
import { MessageSquareText, Search, SendHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { toast } from "../ui/toast";
import { Button } from "../ui/button";
import { v4 as uuid4 } from "uuid"

export default function Messages({ documents }: Messages) {

    const [isGenerating, setIsGenerating] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [question, setQuestion] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { conversationId, refreshConversations } = useConversation()
    const { userId } = useAuth()

    const starterQuestions: string[] = [
        'Provide me information about upcoming trips',
        // 'What are the top 3 destinations for this summer?',
        'Provide me some places to visit in Madhya Pradesh for a 3-day trip',
    ]

    async function chatDocument(question: string): Promise<void> {
        let pendingMessageId: string | null = null

        try {
            if (!userId) {
                // handleSignIn()
                return
            }

            // console.log('hiiii')

            // if (!conversationId) return

            const trimmed = question?.trim()
            if (!trimmed) return

            setQuestion('')
            setIsGenerating(true)

            const messageId = uuid4()
            pendingMessageId = messageId
            setMessages((currentMessages) => [
                ...currentMessages,
                {
                    message_id: messageId,
                    conversation_id: conversationId ?? '',
                    role: 'assiatant',
                    query: trimmed,
                    content: '',
                    created_at: new Date().toISOString(),
                },
            ])

            const response = await addMessage(trimmed, conversationId?.toString() ?? uuid4()?.toString(), userId)
            setMessages((currentMessages) => currentMessages.map((message) =>
                message?.message_id === messageId
                    ? { ...message, content: response?.content ?? '' }
                    : message
            ))
            refreshConversations()

        } catch (error) {
            if (pendingMessageId) {
                setMessages((currentMessages) => currentMessages.filter(
                    (message) => message?.message_id !== pendingMessageId
                ))
            }

            toast.add({
                type: 'error',
                description: 'An error occurred while generating the answer. Please try again after some time...',
                priority: 'low',

            })
        } finally {
            setIsGenerating(false)
        }
    }

    const loadMessages = useCallback(async () => {
        if (!conversationId) {
            setMessages([])
            return
        }

        setIsLoading(true)

        try {
            const response = await getMessages(conversationId)
            const records = Array.isArray(response)
                ? response
                : response?.messages ?? response?.data ?? []

            setMessages(records)
        } catch (error) {
            console.error("Failed to load messages:", error)
            setMessages([])
        }
        setIsLoading(false)
    }, [conversationId])

    useEffect(() => {
        loadMessages()
    }, [loadMessages])


    return (
        <>
            <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center gap-2.5">
                    <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                        <MessageSquareText className="size-4" />
                    </span>
                    <div>
                        <p className="text-sm font-semibold">Ask TrekTripster AI</p>
                        <p className="text-[11px] text-muted-foreground">
                            {documents?.length} sources connected
                        </p>
                    </div>
                </div>
                <button
                    className="rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    aria-label="Search documents"
                >
                    <Search className="size-4" />
                </button>
            </header>

            {/* Messages container */}
            <div className="chat-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto p-3 sm:space-y-5 sm:p-5" >
                {
                    !messages?.length
                    &&
                    (<div className="max-w-[94%] wrap-break-word rounded-2xl rounded-tl-sm bg-secondary px-3 py-2.5 text-sm leading-6 sm:max-w-[88%] sm:px-4 sm:py-3">
                        Hi there. I&apos;m ready to help you explore trip information. What would you like to know?
                    </div>)
                }

                {
                    isLoading ?

                        (<p className="px-3 py-4 text-xs text-muted-foreground">
                            Loading messages...
                        </p>) :

                        // messages?.length > 0 ? (
                        messages?.map((message) =>
                            <div
                                key={`${message?.message_id}`}
                                className="flex w-full flex-col gap-4 wrap-break-word rounded-2xl px-3 py-2.5 text-sm leading-6 sm:px-4 sm:py-3"
                            >

                                {message?.query && (
                                    <div className="ml-auto max-w-[94%] wrap-break-word rounded-2xl rounded-tr-sm bg-primary px-3 py-2.5 text-sm leading-6 text-primary-foreground sm:max-w-[88%] sm:px-4 sm:py-3">
                                        {message?.query}
                                    </div>
                                )}

                                {message?.content && (
                                    <div className="max-w-[94%] wrap-break-word rounded-2xl rounded-tl-sm bg-secondary px-3 py-2.5 text-sm leading-6 sm:max-w-[88%] sm:px-4 sm:py-3">
                                        <ReactMarkdown
                                            components={{
                                                // Headings
                                                h1: ({ children }) => <h1 className="mb-2 text-base font-bold">{children}</h1>,
                                                h2: ({ children }) => <h2 className="mb-2 text-sm font-bold">{children}</h2>,
                                                h3: ({ children }) => <h3 className="mb-1 text-sm font-semibold">{children}</h3>,
                                                // Paragraphs
                                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                                // Lists
                                                ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
                                                ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
                                                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                                // Inline
                                                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                                em: ({ children }) => <em className="italic">{children}</em>,
                                                // Code
                                                code: ({ children }) => (
                                                    <code className="rounded bg-black/10 px-1 py-0.5 font-mono text-xs">{children}</code>
                                                ),
                                                pre: ({ children }) => (
                                                    <pre className="mb-2 overflow-x-auto rounded-lg bg-black/10 p-3 font-mono text-xs last:mb-0">{children}</pre>
                                                ),
                                                // Blockquote
                                                blockquote: ({ children }) => (
                                                    <blockquote className="mb-2 border-l-2 border-current pl-3 opacity-70 last:mb-0">{children}</blockquote>
                                                ),
                                                // Horizontal rule
                                                hr: () => <hr className="my-2 border-current opacity-20" />,
                                            }}
                                        >
                                            {message?.content}
                                        </ReactMarkdown>
                                    </div>
                                )
                                }
                            </div>
                        )
                    //         ) : (
                    // <p className="px-3 py-4 text-xs text-muted-foreground">
                    //     No messages yet.
                    // </p>
                    // )
                }

                {
                    isGenerating && (
                        <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
                            <div
                                role="status"
                                aria-label="Assistant is generating an answer"
                                className="flex max-w-[88%] items-center gap-1 rounded-2xl rounded-tl-sm bg-secondary px-4 py-4"
                            >
                                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                            </div>
                        </div>
                    )
                }

                {
                    messages?.length === 0 &&
                    <div className="pt-3">
                        <p className="mb-3 text-xs font-medium text-muted-foreground">Try asking</p>
                        <div className="space-y-2">
                            {starterQuestions?.map((item) =>
                                <button
                                    key={item}
                                    onClick={
                                        () =>
                                            chatDocument(item)
                                    }
                                    className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-left text-xs transition hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                                    <span>{item}</span>
                                    {/* <SendHorizontal className="size-3.5 -rotate-45 text-muted-foreground" /> */}
                                </button>
                            )}
                        </div>
                    </div>
                }
            </div>

            <div className="shrink-0 border-t border-border p-3 sm:p-4">
                <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
                    <textarea
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                        // onCompositionStart={() => setIsComposing(true)}
                        // onCompositionEnd={() => setIsComposing(false)}
                        onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); chatDocument(question) } }}
                        placeholder="Ask anything about your documents..."
                        rows={1}
                        className="max-h-24 min-h-9 min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
                    />

                    <Button onClick={() => chatDocument(question)} className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40" disabled={!question.trim() || isGenerating}>
                        <SendHorizontal />
                    </Button>

                </div>
                <p className="mt-2 text-center text-[9px] leading-4 text-muted-foreground sm:text-[10px]">TrekTripster AI can make mistakes. Check important information in the source.</p>
            </div>
        </>
    )
}
