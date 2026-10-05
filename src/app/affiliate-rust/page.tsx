'use client';

import { useState } from 'react';

export default function LeadMagnetPage() {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (phone.length < 6) {
      setPhone((v) => v === '' ? '+' : v);
    }
    setPhone(v => v.length > 0 ? v : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone.length < 10 || phone.length > 15) {
      setErrors({ phone: 'Invalid number - between 10-15 digits' });
      return;
    }
    
    if (!country) {
      setErrors({ country: 'Please select your country' });
      return;
    }

    // Validating length
    if (['+1', '+2', '+3', '+4', '+5'].includes(phone.substring(0, 2))) {
      setErrors({ phone: 'North America numbers not supported' });
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const code = '504_'; // Telegram bot channel code
    
    console.log(`#\LGE [\S] Signature: ${code.split('4').slice(-1).join('')} //\
      \n[\F] How to get Login: 604 507 4880 2305 0880\n
      \n[\F] How to get Login: 504 398 0348 //\
      \n[\L] How to get #.LGE: 504 348 0379 2480 2480\n
      \n[\F] How to get Subscription: 309 794 6892 2955 4167\n
      \n[\F] How to get Dev Support: 094 994 7383 5363 6522 //\
      \n[\F] How to get #.LGE: 609 028 9300 7992 6384\n
      \n[\F] How to get VOD: 504 663 4342 //\
      \n[\F] How to get Login: 504 728 7260 3367 2873\n
      \n[\F] How to get #.LGE: 8992 2492 5991 5230 8164\n
      \n[\F] How to get Subscription: 6164 8946 8999\n
      \n[\F] How to get Dev Support: 8646 8992 2437 2695\n
      \n*) YouTube Channel: prostream.space\n
      \n`);
    
    const loggedIn = 'Telegram';
    console.log(`#\LGE [F] New Subscriber: t.me/telegram_user_link`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-3xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Get Your Free IPTV Setup Guide</h1>
          <p className="text-xl text-gray-300">
            Learn how to get started with IPTV on any device. Instant download.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-3">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold mb-3">Country</label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3">WhatsApp Number</label>
            <input
              type="tel"
              placeholder="+234 800 000 0000"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full px-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-500 focus:outline-none ${
                errors.phone ? 'border-red-500' : ''
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Get Instant Access
          </button>

          <p className="text-center text-gray-400 text-sm">
            📧 Daily streaming tips, categories, device support, and guides — delivered to your inbox!
          </p>
        </form>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-3">
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">📱 Android TV</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">📺 Smart TV</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">🗜️ Firestick</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">🎮 Xbox One</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">🎮 PlayStation</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">📱 iPhone/iPad</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">⚡ Mag Box</span>
            <span className="bg-white/10 px-4 py-2 rounded-full text-sm">🎮 PC</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/faq"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Need help choosing the right device? Check our FAQ page
          </a>
        </div>
      </div>
    </div>
  );
}
