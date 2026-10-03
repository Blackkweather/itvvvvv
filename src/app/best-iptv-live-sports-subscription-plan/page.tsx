import type { Metadata } from 'next'
import Link from 'next/link'

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

export default function BestIptvSportsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
          Best IPTV Subscription Plan for Live TV & Sports 2026
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          Tired of expensive cable bills and limited channels? ProStream offers the best IPTV subscription for live TV, sports, movies, and series — all in stunning 4K quality.
        </p>

        <div className="bg-blue-600 text-white rounded-2xl p-8 mb-12 text-center shadow-lg">
          <p className="text-2xl font-bold mb-2">🔥 Limited Offer — 30% OFF Your First Month</p>
          <p className="text-lg mb-4">30 000+ channels • 4K • 7-day trial • Instant activation</p>
          <Link href="/pricing" className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-xl text-lg hover:bg-blue-50 transition">
            Get Started Now
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why ProStream Is the Best IPTV Subscription for Sports & Live TV</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-2">🏆 30 000+ Live Channels</h3>
              <p className="text-gray-600">Sports, news, entertainment, kids, documentaries — every channel you could want, from every corner of the globe.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-2">⚽ All Major Sports</h3>
              <p className="text-gray-600">Premier League, La Liga, NBA, NFL, UFC, F1, Champions League, WWE, and more. Never miss a match.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-2">📺 4K & FHD Quality</h3>
              <p className="text-gray-600">Crystal-clear 4K resolution on supported channels. Anti-freeze technology for buffer-free streaming.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-2">📱 Works on Every Device</h3>
              <p className="text-gray-600">Smart TV, Firestick, Android, iOS, PC, MAG box, Enigma, VLC. One subscription, all devices.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-2">🎬 150 000+ Movies & Series (VOD)</h3>
              <p className="text-gray-600">Latest releases, classics, Netflix-style browsing. Updated daily with new content.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-2">⏱️ 7-Day Free Trial</h3>
              <p className="text-gray-600">Test everything risk-free. No commitment, instant activation, cancel anytime.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Compare IPTV Plans — Find Your Best Fit</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 font-bold">Plan</th>
                  <th className="py-3 px-4 font-bold">Channels</th>
                  <th className="py-3 px-4 font-bold">Quality</th>
                  <th className="py-3 px-4 font-bold">Devices</th>
                  <th className="py-3 px-4 font-bold">Price</th>
                  <th className="py-3 px-4 font-bold">Trial</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold">1 Month</td>
                  <td className="py-3 px-4">30 000+</td>
                  <td className="py-3 px-4">HD/4K</td>
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4">€14.99</td>
                  <td className="py-3 px-4">7 days</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="py-3 px-4 font-semibold">3 Months</td>
                  <td className="py-3 px-4">30 000+</td>
                  <td className="py-3 px-4">HD/4K</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">€29.99</td>
                  <td className="py-3 px-4">7 days</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-semibold">6 Months</td>
                  <td className="py-3 px-4">30 000+</td>
                  <td className="py-3 px-4">HD/4K</td>
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4">€49.99</td>
                  <td className="py-3 px-4">7 days</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-3 px-4 font-bold text-green-700">12 Months 🏆</td>
                  <td className="py-3 px-4">30 000+</td>
                  <td className="py-3 px-4">HD/4K</td>
                  <td className="py-3 px-4">5</td>
                  <td className="py-3 px-4">€79.99</td>
                  <td className="py-3 px-4">7 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <Link href="/pricing" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition inline-block">
              See Full Pricing →
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How to Get Started with Your IPTV Subscription</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
              <h3 className="font-bold mb-2">Choose Your Plan</h3>
              <p className="text-gray-600 text-sm">Pick the subscription that fits your needs. Monthly, quarterly, or yearly — cancel anytime.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
              <h3 className="font-bold mb-2">Get Instant Access</h3>
              <p className="text-gray-600 text-sm">Receive your credentials via email immediately. No waiting, no complicated setup.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
              <h3 className="font-bold mb-2">Start Streaming</h3>
              <p className="text-gray-600 text-sm">Open on any device — Smart TV, Firestick, phone, or PC. Enjoy 30 000+ channels instantly.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-gray-900 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <p className="italic mb-3">"Best IPTV for sports. I watch Premier League and UFC in 4K — zero buffering. Saved €80/month compared to cable."</p>
              <p className="font-bold">— Ahmed, Casablanca</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <p className="italic mb-3">"Tried the 7-day trial, subscribed the same day. 30 000 channels is no joke. Customer support answered in 2 minutes."</p>
              <p className="font-bold">— Maria, Madrid</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <p className="italic mb-3">"Works perfectly on Firestick and my iPhone. My whole family uses it. Best IPTV subscription I've ever had."</p>
              <p className="font-bold">— Karim, Paris</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2">What is the best IPTV subscription for live sports?</h3>
              <p className="text-gray-600">ProStream offers 30 000+ channels including all major sports: Premier League, La Liga, NBA, NFL, UFC, F1, Champions League, WWE, and more — all in HD and 4K.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2">Can I try before I buy?</h3>
              <p className="text-gray-600">Yes! We offer a 7-day free trial with full access to all channels and features. No credit card required.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2">What devices are supported?</h3>
              <p className="text-gray-600">Smart TV (Samsung, LG, Sony), Amazon Firestick, Android TV, iPhone/iPad, PC/Mac, MAG boxes, Enigma, VLC, and more. One subscription works on all devices.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2">Is the IPTV service stable?</h3>
              <p className="text-gray-600">Yes. Our anti-freeze technology ensures smooth streaming in 4K and FHD. 99.9% uptime with dedicated servers worldwide.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2">How do I get started?</h3>
              <p className="text-gray-600">Choose a plan, complete payment, and receive your credentials instantly via email. Setup takes under 5 minutes.</p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link href="/pricing" className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl text-xl hover:bg-blue-700 transition inline-block">
            Get Your IPTV Subscription Now — 7-Day Free Trial 🚀
          </Link>
        </div>
      </div>
    </main>
  )
}
