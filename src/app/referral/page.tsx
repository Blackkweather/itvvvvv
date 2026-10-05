import Link from 'next/link'

export default function AffiliatePage() {
  const affiliateLinks = [
    {
      platform: 'Amazon',
      link: 'https://amzn.to/your-affiliate-link',
      category: 'Streaming Devices'
    },
    {
      platform: 'Firestick',
      link: 'https://amzn.to/your-firestick-link',
      category: 'Smart TV'
    },
    {
      platform: 'Android Box',
      link: 'https://amzn.to/your-android-link',
      category: 'Streaming Box'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Affiliate Program
        </h1>
        
        <p className="text-center text-gray-300 mb-12 text-lg">
          Earn up to $50 per successful referral. Share your unique code with friends and get paid.
        </p>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Unique Referral Code</h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              value="YOUR-CODE" 
              readOnly
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded text-white font-mono"
            />
            <button className="bg-blue-600 px-6 py-3 rounded font-semibold hover:bg-blue-700">
              Copy
            </button>
          </div>
        </div>

        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li className="text-gray-300">Share your referral code with friends</li>
            <li className="text-gray-300">When they sign up, you get a unique tracking link</li>
            <li className="text-gray-300">Earn 20% commission on their first purchase</li>
            <li className="text-gray-300">Withdraw earnings up to $50 per successful referral</li>
          </ol>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Popular Streaming Gear (Recommended for Your Customers)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {affiliateLinks.map((item, idx) => (
              <Link 
                key={idx}
                href={item.link}
                className="bg-gray-700 rounded p-4 hover:bg-gray-600 transition"
                target="_blank"
              >
                <h3 className="font-bold text-lg">{item.platform}</h3>
                <p className="text-gray-400 text-sm">{item.category}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Apply for Referral Program</h2>
          <p className="mb-4 text-gray-300">Fill out this form to join our affiliate program.</p>
          <form className="space-y-4">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded"
            />
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded"
            />
            <textarea 
              placeholder="How will you refer customers?" 
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded"
            />
            <button 
              type="submit"
              className="w-full bg-blue-600 py-3 rounded font-semibold hover:bg-blue-700"
            >
              Apply Now
            </button>
          </form>
        </div>

        <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Earnings Dashboard</h2>
          <p className="text-gray-300">Login to see your earnings and payout history.</p>
          <Link 
            href="/dashboard/referrals"
            className="inline-block mt-4 bg-yellow-600 px-6 py-3 rounded font-semibold hover:bg-yellow-700"
          >
            View Dashboard
          </Link>
        </div>

        <p className="text-center text-gray-500 mt-8">
          Need help? Email support@prostream.space
        </p>
      </div>
    </div>
  )
}
