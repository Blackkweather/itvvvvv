import { HeroBanner } from '@/components/home/HeroBanner';
import { ContentExplorer } from '@/components/home/ContentExplorer';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { DevicesSection } from '@/components/home/DevicesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <ContentExplorer />
      <FeaturesSection />
      <DevicesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
