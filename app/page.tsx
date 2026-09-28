'use client'

import {
  Copyright,
  FolderOpen,
} from 'lucide-react'
import { toast } from '@/components/ui/toast'
import Navbar from '@/components/navbar'
import Content from '@/components/content'
import Chat from '@/components/chat/chat'
import { useAuth } from '@clerk/nextjs'

const documents: { name: string; meta: string; color: string }[] = [
  { name: '/trek-tripster.png', meta: '2.4 MB · 12 pages', color: 'bg-cyan-100 text-cyan-800' },
]

export default function Page() {

  // const [messages, setMessages] = useState<Message[]>([])
  const { userId } = useAuth()

  function handleSignIn() {
    if (!userId) {
      toast.add({
        type: 'error',
        description: 'Please sign in to use the chat feature.',
        priority: 'low',
      })
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">

      <Navbar />

      {/* Hero Section */}
      <section id="top" className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-10 pt-8 sm:gap-10 sm:px-6 sm:pb-14 sm:pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-16">

        {/* Content */}
        <Content />

        {/* Chat Interface */}
        <Chat documents={documents} handleSignIn={handleSignIn} />
      </section>


      <footer id="security" className="mx-auto flex w-full max-w-7xl flex-col items-start gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6 lg:px-10">
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
