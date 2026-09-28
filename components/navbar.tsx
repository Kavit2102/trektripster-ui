import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from './ui/button'

export default function Navbar() {

    return (
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-6 lg:px-10">
            <a
                href='/'
                className="flex min-w-0 items-center gap-2.5 font-semibold tracking-tight"
                aria-label="Trektripster home"
            >
                <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Image src="/trek-tripster.png" alt="trek-tripster" width={80} height={80} />
                </span>
                <span className="truncate text-sm tracking-wider sm:text-base">TrekTripster AI</span>
            </a>

            {/* User Authentication */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <Button variant="ghost" className="px-2 text-xs text-muted-foreground hover:text-foreground sm:px-3 sm:text-sm">
                            Sign in
                        </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button className="px-2 text-xs sm:px-3 sm:text-sm">Sign up</Button>
                    </SignUpButton>
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>
        </nav>
    )
}
