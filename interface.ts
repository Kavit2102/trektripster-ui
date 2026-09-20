export interface ChatInterfaceProps {
    documents: { name: string; meta: string; color: string }[]
    starterQuestions: string[]
    handleSignIn: () => void
}