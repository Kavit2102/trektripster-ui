import { useConversation } from "@/context/conversation.context";
import { History, MessageSquareText, Plus } from "lucide-react";
import { v4 as uuid4 } from "uuid"

export default function NewConversation() {

    const { setConversationId } = useConversation()

    return (
        <button
            type="button"
            aria-label="New conversation"
            onClick={() => setConversationId(uuid4())}
            className="ml-auto rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground cursor-pointer"
        >
            <Plus className="size-4" />
        </button>
    )
}
