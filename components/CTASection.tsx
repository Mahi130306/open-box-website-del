import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="bg-surface border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Ready to dive in?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
          Join Open Box today. Find your server, meet your peers, and start building.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="min-h-[44px]">
            <Link href="/join">
              Join Open Box
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-h-[44px]">
            <Link href="/servers">
              Browse Directory
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
