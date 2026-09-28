import { MessageSquareText, Search, SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { Message } from '@/interfaces';
import { useAuth } from '@clerk/nextjs';
import { addMessage } from '@/api/message.api';
import { useConversation } from '@/context/conversation.context';
import { toast } from '../ui/toast';
import { v4 as uuid4 } from "uuid";

export default function Input() {

    const [question, setQuestion] = useState('')
    // const [isComposing, setIsComposing] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const { conversationId } = useConversation()
    const { userId } = useAuth()

    async function chatDocument(question: string): Promise<void> {
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

            const response = await addMessage(trimmed, conversationId?.toString() ?? uuid4()?.toString(), userId)
            console.log(response?.content)

        } catch (error) {
            toast.add({
                type: 'error',
                description: 'An error occurred while generating the answer. Please try again after some time...',
                priority: 'low',

            })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
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
    )
}
