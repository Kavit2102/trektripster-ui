import { useAuth } from '@clerk/nextjs';
import { MessageSquareText, Search, SendHorizontal } from 'lucide-react';
import { useState } from 'react'
import { toast } from './ui/toast';
import { Button } from './ui/button';

type Message = {
    content: string
    role: 'user' | 'assistant'
}

interface ChatInterfaceProps {
    documents: { name: string; meta: string; color: string }[]
    starterQuestions: string[]
    handleSignIn: () => void
}

export default function ChatInterface({ documents, starterQuestions, handleSignIn }: ChatInterfaceProps) {

    const [question, setQuestion] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const [isComposing, setIsComposing] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const { userId } = useAuth()

    async function chatDocument(question: string): Promise<void> {
        try {
            if (!userId) {
                handleSignIn()
                return
            }

            const trimmed = question?.trim()
            if (!trimmed) return

            setMessages((current) => [...current, { content: trimmed, role: 'user' }])
            setQuestion('')
            setIsGenerating(true)
            const response = await fetch('https://trektripster-server-one.vercel.app/chat-document',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question: trimmed }),
                }
            )

            const data = await response.json()

            setMessages((current) => [...current, { content: data, role: 'assistant' }])

        } catch (error) {
            toast.add({
                type: 'error',
                description: 'An error occurred while generating the answer. Please try again.',
                priority: 'low',

            })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="relative rounded-[1.75rem] border border-border bg-card p-3 shadow-[0_24px_80px_-32px_rgba(16,36,48,0.35)] sm:p-4">
            <div className="flex min-h-135 overflow-hidden rounded-2xl border border-border bg-background">

                <div className="flex min-w-0 flex-1 flex-col">
                    <header className="flex items-center justify-between border-b border-border px-5 py-4">
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
                    <div className="flex-1 space-y-5 overflow-y-auto p-5">
                        <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm leading-6">
                            Hi there. I&apos;m ready to help you explore your documents. What would you like to know?
                        </div>

                        {
                            messages?.map((message, index) =>
                                <div key={`${message?.content}-${index}`} className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'ml-auto rounded-tr-sm bg-primary text-primary-foreground' : 'rounded-tl-sm bg-secondary'}`}>
                                    {message?.content}
                                </div>
                            )
                        }

                        {isGenerating && (
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
                        )}

                        {messages?.length === 0 &&
                            <div className="pt-3">
                                <p className="mb-3 text-xs font-medium text-muted-foreground">Try asking</p>
                                <div className="space-y-2">
                                    {starterQuestions?.map((item) =>
                                        <button key={item} onClick={() => chatDocument(item)} className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-left text-xs transition hover:border-primary/50 hover:bg-primary/5">
                                            <span>{item}</span>
                                            <SendHorizontal className="size-3.5 -rotate-45 text-muted-foreground" />
                                        </button>
                                    )}
                                </div>
                            </div>}
                    </div>
                    <div className="border-t border-border p-4"><div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2 shadow-sm focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">

                        {/* <button className="mb-0.5 rounded-lg p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground" aria-label="Attach a document" onClick={addDocument}>
                  <Paperclip className="size-4" />
                </button> */}

                        <textarea
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            onCompositionStart={() => setIsComposing(true)}
                            onCompositionEnd={() => setIsComposing(false)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); chatDocument(question) } }}
                            placeholder="Ask anything about your documents..."
                            rows={1}
                            className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground" />

                        <Button onClick={() => chatDocument(question)} className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40" disabled={!question.trim() || isGenerating}>
                            <SendHorizontal />
                        </Button>
                    </div>
                        <p className="mt-2 text-center text-[10px] text-muted-foreground">TrekTripster AI can make mistakes. Check important information in the source.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
