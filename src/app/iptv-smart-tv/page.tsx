import { SMART_TV_CONFIG } from "@/components/device/deviceConfig";
import { generateDeviceMetadata } from "@/components/device/generateDeviceMetadata";
import { DeviceSchemas } from "@/components/device/DeviceSchemas";

export const metadata = generateDeviceMetadata(SMART_TV_CONFIG);

export default function SmartTVPage() {
  const config = SMART_TV_CONFIG;

  return (
    <>
      <DeviceSchemas config={config} />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{config.h1}</h1>
            <p className="text-xl text-muted-foreground mb-8">{config.intro}</p>
            <a 
              href={config.cta.link}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {config.cta.text}
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose StreamPro for {config.name}?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup Guide Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How to Set Up StreamPro on {config.name}
            </h2>
            <div className="space-y-8">
              {config.setupSteps.map((step) => (
                <div 
                  key={step.step}
                  className="flex gap-6 p-6 rounded-xl bg-card border border-border"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {config.faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-background border border-border"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Streaming?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get your 24-hour free trial and experience the best IPTV service on your {config.name}.
            </p>
            <a 
              href={config.cta.link}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {config.cta.text}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
