import { Check } from 'lucide-react'

export default function Content() {
    return (
        <div className="w-full max-w-xl">
            <p className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:mb-6 sm:text-xs">
                <span className="size-2 rounded-full bg-primary" />
                Lacking context? We&apos;ve got you covered...
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                <span>Ask us{' '}</span>
                <span className="font-serif italic font-normal text-primary">anything{' '}</span>
            </h1>
            <p className="mt-5 max-w-md text-pretty text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8">Our agent turns scattered itinerary information into clear, cited answers.</p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs text-muted-foreground sm:mt-9 sm:gap-3 sm:text-sm">
                <span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                    <Check className="size-3.5 text-primary" />
                    Answers with sources
                </span>
                <span className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                    <Check className="size-3.5 text-primary" />
                    Private by default
                </span>
            </div>
        </div>
    )
}
