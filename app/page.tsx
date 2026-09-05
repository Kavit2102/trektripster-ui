'use client'

import {
  Copyright,
  FolderOpen,
} from 'lucide-react'
import { toast } from '@/components/ui/toast'
import Navbar from '@/components/navbar'
import Content from '@/components/content'
import ChatInterface from '@/components/chat-interface'
import { useAuth } from '@clerk/nextjs'

const starterQuestions: string[] = [
  'Provide me information about upcoming trips',
  // 'What are the top 3 destinations for this summer?',
  'Provide me some places to visit in Madhya Pradesh for a 3-day trip',
]

type Message = {
  content: string
  role: 'user' | 'assistant'
}

const documents: { name: string; meta: string; color: string }[] = [
  { name: '/trek-tripster.png', meta: '2.4 MB · 12 pages', color: 'bg-cyan-100 text-cyan-800' },
]

export default function Page() {

  // const [messages, setMessages] = useState<Message[]>([])
  const { userId, isSignedIn, sessionId } = useAuth()

  function handleSignIn() {
    if (!userId) {
      toast.add({
        type: 'error',
        description: 'Please sign in to use the chat feature.',
        priority: 'low',
      })
    }
  }

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     setMessages([])
  //   }
  // }, [isSignedIn])

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">

      <Navbar />

      {/* Hero Section */}
      <section id="top" className="mx-auto grid max-w-7xl gap-12 px-6 pb-14 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-16">

        {/* Content */}
        <Content />

        {/* Chat Interface */}
        <ChatInterface documents={documents} starterQuestions={starterQuestions} handleSignIn={handleSignIn} />
      </section>


      <footer id="security" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs text-muted-foreground lg:px-10">
        <span className="flex items-center gap-2">
          <Copyright className="size-3.5" />
          TrekTripster AI. All rights reserved.
        </span>
        <span className="flex items-center gap-2">
          <FolderOpen className="size-3.5" />
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </span>
        <span id="resources">No data leaves your workspace without permission.</span>
      </footer>
    </main>
  )
}
