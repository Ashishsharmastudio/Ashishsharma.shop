import SectionHeader from '../components/ui/SectionHeader';

interface LegalProps {
  type: 'privacy' | 'terms';
  key?: string;
}

export default function Legal({ type }: LegalProps) {
  const isPrivacy = type === 'privacy';

  return (
    <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <SectionHeader
        eyebrow="Compliance"
        title={isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        description={`Last updated: July 19, 2026. Please read our standard operations guidelines regarding ${
          isPrivacy ? 'personal data, API security, and client credentials' : 'licenses, delivery clauses, and liability frameworks'
        }.`}
      />

      {/* Styled legal content block */}
      <article className="prose prose-invert max-w-none text-studio-text-secondary space-y-8 font-sans text-sm md:text-base leading-relaxed border-t border-studio-border/50 pt-12">
        {isPrivacy ? (
          <>
            <section className="space-y-3">
              <h3 className="font-display font-medium text-lg text-white">1. Data Sovereignty & Security</h3>
              <p>
                Ashish Sharma does not trade, rent, or leverage user or client operational telemetry for secondary advertising monetization. We structure database collections utilizing industry-standard TLS encryption protocols, isolating tenant databases.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-medium text-lg text-white">2. Token Security & API Keys</h3>
              <p>
                Any third-party API credentials, secret keys (including but not limited to OpenAI, Stripe, database secrets), or cloud assets provided during our development sprints are stored server-side behind encrypted environmental environments. Under no circumstances do we expose raw keys client-side.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-medium text-lg text-white">3. Cookies and Analytics</h3>
              <p>
                We minimize state-aware storage on your browser. We run cookies exclusively for keeping routing state intact, persistent dark preferences, or verifying authenticated sessions. No background tracking pixels or cross-domain ad telemetry is injected into our standard client builds.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-3">
              <h3 className="font-display font-medium text-lg text-white">1. Scope of Engagement & Delivery</h3>
              <p>
                Unless explicitly stated inside individual work statements, all custom layouts, design mockups, and compilations of source-code delivered under "Fixed Project" agreements transition entirely into intellectual property under the client's control upon the receipt of final contract dues.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-medium text-lg text-white">2. Warranty & Service SLA</h3>
              <p>
                We guarantee software builds for a duration of 30 days post-launch, covering defects, broken routes, or API crashes arising directly from our authored code. We do not warranty structural outages caused by third-party vendor platforms or sudden deprecated endpoints.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="font-display font-medium text-lg text-white">3. Liability Boundaries</h3>
              <p>
                Under no circumstances shall Ashish Sharma or its co-founders be held liable for indirect, collateral, or performance-related revenue drop-offs resulting from operational downtimes, server maintenance limits, or data leaks occurring inside client-controlled deployment environments.
              </p>
            </section>
          </>
        )}
      </article>
    </main>
  );
}
