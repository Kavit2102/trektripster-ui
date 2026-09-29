import { useState } from 'react';
import { ChatInterfaceProps } from '@/interfaces';
import Conversations from './conversations';
import Messages from './messages';
import Input from './input';
import { ConversationProvider } from '@/context/conversation.context'
import { MessageProvider } from '@/context/message.context';

export default function Chat({ documents, handleSignIn }: ChatInterfaceProps) {
    const [isConversationHistoryOpen, setIsConversationHistoryOpen] = useState(false)

    return (
        <ConversationProvider>
            <MessageProvider>
                <div className="relative min-w-0 rounded-2xl border border-border bg-card p-2 shadow-[0_24px_80px_-32px_rgba(16,36,48,0.35)] sm:rounded-[1.75rem] sm:p-3 lg:p-4">
                    <div className="relative flex h-[min(44rem,calc(100dvh-8rem))] min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background sm:rounded-2xl">

                        {isConversationHistoryOpen && (
                            <div className="absolute inset-0 z-20 flex">
                                <button
                                    type="button"
                                    aria-label="Close conversation history"
                                    onClick={() => setIsConversationHistoryOpen(false)}
                                    className="absolute inset-0 bg-black/30"
                                />
                                <div
                                    id="conversation-history"
                                    role="dialog"
                                    aria-modal="true"
                                    aria-label="Conversation history"
                                    className="relative z-10 h-full w-[min(20rem,85vw)] shadow-xl"
                                >
                                    <Conversations onClose={() => setIsConversationHistoryOpen(false)} />
                                </div>
                            </div>
                        )}

                        <div className="flex min-h-0 min-w-0 flex-1 flex-col">

                            <Messages
                                documents={documents}
                                isConversationHistoryOpen={isConversationHistoryOpen}
                                onOpenConversations={() => setIsConversationHistoryOpen(true)}
                            />
                            {/* <Input /> */}
                        </div>
                    </div>
                </div>
            </MessageProvider>
        </ConversationProvider>
    )
}