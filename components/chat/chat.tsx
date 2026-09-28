import { ChatInterfaceProps } from '@/interfaces';
import Conversations from './conversations';
import Messages from './messages';
import Input from './input';
import { ConversationProvider } from '@/context/conversation.context'
import { MessageProvider } from '@/context/message.context';

export default function Chat({ documents, handleSignIn }: ChatInterfaceProps) {

    return (
        <ConversationProvider>
            <MessageProvider>
                <div className="relative min-w-0 rounded-2xl border border-border bg-card p-2 shadow-[0_24px_80px_-32px_rgba(16,36,48,0.35)] sm:rounded-[1.75rem] sm:p-3 lg:p-4">
                    <div className="flex h-[min(44rem,calc(100dvh-8rem))] min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background sm:rounded-2xl md:flex-row">

                        <Conversations />

                        <div className="flex min-h-0 min-w-0 flex-1 flex-col">

                            <Messages documents={documents} />
                            {/* <Input /> */}
                        </div>
                    </div>
                </div>
            </MessageProvider>
        </ConversationProvider>
    )
}