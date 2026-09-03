import { SignedIn, SignedOut, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from './ui/button'

export default function Navbar() {

    return (
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <a
                href="#top"
                className="flex items-center gap-2.5 font-semibold tracking-tight"
                aria-label="Lumen home"
            >
                <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Image src="/trek-tripster.png" alt="trek-tripster" width={80} height={80} />
                </span>
                <span className='tracking-wider'>TrekTripster AI</span>
            </a>

            {/* User Authentication */}
            <div className="flex items-center gap-2">
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="ghost" className="px-3 text-sm text-muted-foreground hover:text-foreground">
                            Sign in
                        </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button className="px-3 text-sm">Sign up</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}
