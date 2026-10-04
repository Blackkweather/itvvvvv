import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgePercent,
  Check,
  ChevronDown,
  Crown,
  Film,
  Mail,
  MonitorPlay,
  MousePointerClick,
  Play,
  Quote,
  Smartphone,
  Star,
  Timer,
  Trophy,
  Tv,
  type LucideIcon,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best IPTV Subscription Plan for Live TV & Sports 2026 | ProStream',
  description: 'Get the best IPTV subscription plan for live TV and sports in 2026. 30 000+ channels, 4K quality, 7-day trial, works on all devices. Start streaming today.',
  keywords: ['best IPTV subscription plan live TV sports 2026', 'IPTV sports channels 4K', 'premium IPTV service', 'IPTV for live sports', 'stream live TV online'],
  openGraph: {
    title: 'Best IPTV Subscription Plan for Live TV & Sports 2026',
    description: '30 000+ channels • 4K quality • 7-day trial • All devices',
    url: 'https://prostream.space/best-iptv-live-sports-subscription-plan',
    siteName: 'ProStream',
    type: 'website',
  },
}

const features: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Tv, title: '30 000+ Live Channels', description: 'Sports, news, entertainment, kids, documentaries — every channel you could want, from every corner of the globe.' },
  { icon: Trophy, title: 'All Major Sports', description: 'Premier League, La Liga, NBA, NFL, UFC, F1, Champions League, WWE, and more. Never miss a match.' },
  { icon: MonitorPlay, title: '4K & FHD Quality', description: 'Crystal-clear 4K resolution on supported channels. Anti-freeze technology for buffer-free streaming.' },
  { icon: Smartphone, title: 'Works on Every Device', description: 'Smart TV, Firestick, Android, iOS, PC, MAG box, Enigma, VLC. One subscription, all devices.' },
  { icon: Film, title: '150 000+ Movies & Series (VOD)', description: 'Latest releases, classics, Netflix-style browsing. Updated daily with new content.' },
  { icon: Timer, title: '7-Day Free Trial', description: 'Test everything risk-free. No commitment, instant activation, cancel anytime.' },
]

const plans = [
  { name: '1 Month', devices: 1, price: '€14.99' },
  { name: '3 Months', devices: 2, price: '€29.99' },
  { name: '6 Months', devices: 3, price: '€49.99' },
  { name: '12 Months', devices: 5, price: '€79.99', best: true },
]

const steps: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: MousePointerClick, title: 'Choose Your Plan', description: 'Pick the subscription that fits your needs. Monthly, quarterly, or yearly — cancel anytime.' },
  { icon: Mail, title: 'Get Instant Access', description: 'Receive your credentials via email immediately. No waiting, no complicated setup.' },
  { icon: Play, title: 'Start Streaming', description: 'Open on any device — Smart TV, Firestick, phone, or PC. Enjoy 30 000+ channels instantly.' },
]

const testimonials = [
  { quote: 'Best IPTV for sports. I watch Premier League and UFC in 4K — zero buffering. Saved €80/month compared to cable.', name: 'Ahmed', city: 'Casablanca' },
  { quote: 'Tried the 7-day trial, subscribed the same day. 30 000 channels is no joke. Customer support answered in 2 minutes.', name: 'Maria', city: 'Madrid' },
  { quote: 'Works perfectly on Firestick and my iPhone. My whole family uses it. Best IPTV subscription I\'ve ever had.', name: 'Karim', city: 'Paris' },
]

const faqs = [
  { question: 'What is the best IPTV subscription for live sports?', answer: 'ProStream offers 30 000+ channels including all major sports: Premier League, La Liga, NBA, NFL, UFC, F1, Champions League, WWE, and more — all in HD and 4K.' },
  { question: 'Can I try before I buy?', answer: 'Yes! We offer a 7-day free trial with full access to all channels and features. No credit card required.' },
  { question: 'What devices are supported?', answer: 'Smart TV (Samsung, LG, Sony), Amazon Firestick, Android TV, iPhone/iPad, PC/Mac, MAG boxes, Enigma, VLC, and more. One subscription works on all devices.' },
  { question: 'Is the IPTV service stable?', answer: 'Yes. Our anti-freeze technology ensures smooth streaming in 4K and FHD. 99.9% uptime with dedicated servers worldwide.' },
  { question: 'How do I get started?', answer: 'Choose a plan, complete payment, and receive your credentials instantly via email. Setup takes under 5 minutes.' },
]

function SectionBadge({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
      <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80">{label}</span>
    </div>
  )
}

function PrimaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-[0_0_40px_-10px_hsl(var(--primary))] transition-all hover:bg-primary/90 hover:shadow-[0_0_50px_-8px_hsl(var(--primary))]"
    >
      {children}
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
    </Link>
  )
}

export default function BestIptvSportsPage() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      {/* Background atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />

      {/* Hero */}
      <section className="relative section-padding pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <SectionBadge icon={Trophy} label="Live TV & Sports · 2026" />
          <h1 className="mb-6 text-4xl font-black uppercase leading-[0.95] tracking-tighter md:text-6xl">
            Best IPTV Subscription Plan for <span className="gradient-text-gold">Live TV & Sports</span> 2026
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-[#a0a0a0] md:text-lg">
            Tired of expensive cable bills and limited channels? ProStream offers the best IPTV subscription for live TV, sports, movies, and series — all in stunning 4K quality.
          </p>

          {/* Offer card */}
          <div className="glass-strong relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-8 md:p-10">
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                <BadgePercent className="h-4 w-4" strokeWidth={2} />
                Limited Offer
              </div>
              <p className="mb-3 text-2xl font-black uppercase tracking-tight text-[#f0f0f0] md:text-3xl">
                30% Off Your First Month
              </p>
              <ul className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#a0a0a0]">
                {['30 000+ channels', '4K quality', '7-day trial', 'Instant activation'].map((item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <PrimaryCta href="/pricing">Get Started Now</PrimaryCta>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative section-padding py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <SectionBadge icon={Crown} label="Why ProStream" />
            <h2 className="mx-auto max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
              Why ProStream Is the Best IPTV Subscription for Sports & Live TV
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group glass-strong relative rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 md:p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-primary group-hover:bg-primary">
                  <Icon className="h-6 w-6 text-white transition-colors group-hover:text-background" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-lg font-bold uppercase tracking-tight text-[#f0f0f0] transition-colors group-hover:text-primary">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#a0a0a0]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan comparison */}
      <section className="relative section-padding py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <SectionBadge icon={BadgePercent} label="Plans" />
            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
              Compare IPTV Plans — Find Your Best Fit
            </h2>
          </div>
          <div className="glass-strong overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[10px] font-black uppercase tracking-[0.2em] text-[#a0a0a0]">
                    {['Plan', 'Channels', 'Quality', 'Devices', 'Price', 'Trial'].map((heading) => (
                      <th key={heading} scope="col" className="px-6 py-4">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr
                      key={plan.name}
                      className={`border-b border-white/[0.05] last:border-0 ${plan.best ? 'bg-primary/[0.08]' : 'transition-colors hover:bg-white/[0.02]'}`}
                    >
                      <th scope="row" className="px-6 py-5 font-bold text-[#f0f0f0]">
                        <span className="inline-flex items-center gap-2">
                          {plan.name}
                          {plan.best && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary-foreground">
                              <Crown className="h-3 w-3" strokeWidth={2.5} />
                              Best Value
                            </span>
                          )}
                        </span>
                      </th>
                      <td className="px-6 py-5 text-[#a0a0a0]">30 000+</td>
                      <td className="px-6 py-5 text-[#a0a0a0]">HD/4K</td>
                      <td className="px-6 py-5 text-[#a0a0a0]">{plan.devices}</td>
                      <td className={`px-6 py-5 text-base font-black ${plan.best ? 'text-primary' : 'text-[#f0f0f0]'}`}>{plan.price}</td>
                      <td className="px-6 py-5 text-[#a0a0a0]">7 days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 text-center">
            <PrimaryCta href="/pricing">See Full Pricing</PrimaryCta>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative section-padding py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <SectionBadge icon={Play} label="Get Started" />
            <h2 className="mx-auto max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
              How to Get Started with Your IPTV Subscription
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
            {steps.map(({ icon: Icon, title, description }, i) => (
              <li key={title} className="glass-strong relative rounded-3xl p-6 md:p-8">
                <span aria-hidden="true" className="absolute right-6 top-5 text-5xl font-black tracking-tighter text-white/[0.06]">
                  0{i + 1}
                </span>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-lg font-bold uppercase tracking-tight text-[#f0f0f0]">{title}</h3>
                <p className="text-sm leading-relaxed text-[#a0a0a0]">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative section-padding py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <SectionBadge icon={Star} label="Reviews" />
            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {testimonials.map(({ quote, name, city }) => (
              <figure key={name} className="glass-strong flex flex-col rounded-3xl p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" strokeWidth={0} />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-white/10" strokeWidth={1.5} />
                </div>
                <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-[#d0d0d0]">&ldquo;{quote}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-black text-primary">
                    {name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-[#f0f0f0]">{name}</span>
                    <span className="block text-xs text-[#a0a0a0]">{city}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative section-padding py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <SectionBadge icon={Check} label="FAQ" />
            <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ question, answer }, i) => (
              <details
                key={question}
                open={i === 0}
                className="group glass-strong rounded-2xl transition-colors open:border-primary/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-bold text-[#f0f0f0]">{question}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#a0a0a0] transition-transform duration-300 group-open:rotate-180 group-open:text-primary" strokeWidth={2} />
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-[#a0a0a0]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative section-padding pb-24 pt-8">
        <div className="glass-strong relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-10 text-center md:p-14">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="mb-4 text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-5xl">
              Ready to <span className="gradient-text-gold">Start Streaming?</span>
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-[#a0a0a0]">
              30 000+ channels, every major league, 4K quality — with a 7-day free trial.
            </p>
            <PrimaryCta href="/pricing">Get Your IPTV Subscription Now</PrimaryCta>
          </div>
        </div>
      </section>
    </div>
  )
}
