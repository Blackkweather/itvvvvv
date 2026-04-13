import { HeroBanner } from '@/components/home/HeroBanner';
import { ContentExplorer } from '@/components/home/ContentExplorer';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { DevicesSection } from '@/components/home/DevicesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';
import { LiveTicker } from '@/components/ui/LiveTicker';
import { AdCashSlot } from '@/components/ads/AdCashSlot';

export default function Home() {
  const zoneId = process.env.NEXT_PUBLIC_ADCASH_ZONE_ID || '';
  const siteId = process.env.NEXT_PUBLIC_ADCASH_SITE_ID || '';
  
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <LiveTicker />
      <ContentExplorer />
      <FeaturesSection />
      
      {/* Ad Break 1 */}
      <div className="section-padding py-8 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <AdCashSlot zoneId={zoneId} siteId={siteId} label="Featured advertisement" />
        </div>
      </div>
      
      <DevicesSection />
      <TestimonialsSection />
      
      {/* Ad Break 2 */}
      <div className="section-padding py-8">
        <div className="max-w-4xl mx-auto">
          <AdCashSlot zoneId={zoneId} siteId={siteId} label="Secondary advertisement" />
        </div>
      </div>
      
      <FAQSection />
      <CTASection />
    </div>
  );
}
