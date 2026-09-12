import { useState, FormEvent } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { Send, CheckCircle, Flame, ServerCrash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../components/ui/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    projectType: 'AI Product',
    budget: '$10K–$25K',
    timeline: '1-3 months',
    details: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const projectTypes = [
    'Website', 'Web Application', 'AI Product', 'UX/UI Design', 'Automation', 'AI Agent', 'Other'
  ];

  const budgets = [
    'Under $5K', '$5K–$10K', '$10K–$25K', '$25K–$50K', '$50K+'
  ];

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.details.trim()) tempErrors.details = 'Please describe your project';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API connection with 1.5s delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <SectionHeader
        eyebrow="Get In Touch"
        title="Tell us what you're building."
        description="Whether you have complete technical specifications or simply a bold idea, let us know. We respond to all qualified queries within one business day."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-12">
        {/* Left column: Diagnostic info and contacts */}
        <div className="lg:col-span-4 space-y-10">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-studio-accent mb-4">// Direct Contacts</h3>
            <div className="space-y-3 font-sans text-sm text-studio-text-secondary">
              <p>
                Inquiries:{' '}
                <a href="mailto:divyanshusaini890@gmail.com" className="text-white hover:text-studio-accent transition-colors">
                  divyanshusaini890@gmail.com
                </a>
              </p>
              <p>
                Studio Hours: Mon — Fri, 9am — 6pm PST
              </p>
              <p>
                Location: San Francisco, CA // Distributed Node
              </p>
            </div>
          </div>

          <div className="bg-studio-card/45 border border-studio-border p-6 rounded-xl space-y-3 font-mono text-[10px] text-studio-text-secondary">
            <div>// INTEGRATION ENDPOINTS</div>
            <div>STATUS: STANDBY</div>
            <div>CONNECTORS: RESEND, FORMSPREE, CUSTOM CRM</div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              ENDPOINT SECURE SSL
            </div>
          </div>
        </div>

        {/* Right column: Form / Success viewports */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="inquiry-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit}
                className="bg-studio-card/30 border border-studio-border p-6 md:p-10 rounded-2xl space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-mono text-[10px] uppercase text-studio-text-secondary tracking-wider">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111] border border-studio-border focus:border-studio-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="Jane Doe"
                    />
                    {errors.name && <span className="text-red-400 font-mono text-[10px]">{errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-mono text-[10px] uppercase text-studio-text-secondary tracking-wider">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111] border border-studio-border focus:border-studio-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="jane@company.com"
                    />
                    {errors.email && <span className="text-red-400 font-mono text-[10px]">{errors.email}</span>}
                  </div>

                  {/* Company field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="font-mono text-[10px] uppercase text-studio-text-secondary tracking-wider">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#111] border border-studio-border focus:border-studio-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="Enterprise Co"
                    />
                  </div>

                  {/* Website field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="website" className="font-mono text-[10px] uppercase text-studio-text-secondary tracking-wider">
                      Website URL
                    </label>
                    <input
                      id="website"
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-[#111] border border-studio-border focus:border-studio-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>

                {/* Project Type choice buttons */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] uppercase text-studio-text-secondary tracking-wider">
                    Project Type *
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`px-3.5 py-1.5 rounded-full border text-xs font-mono transition-colors cursor-pointer focus:outline-none ${
                          formData.projectType === type
                            ? 'bg-studio-accent border-transparent text-white'
                            : 'bg-white/5 border-studio-border text-studio-text-secondary hover:text-white hover:border-white/15'
                        }`}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range choice buttons */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] uppercase text-studio-text-secondary tracking-wider">
                    Estimated Budget *
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: bud })}
                        className={`px-3.5 py-1.5 rounded-full border text-xs font-mono transition-colors cursor-pointer focus:outline-none ${
                          formData.budget === bud
                            ? 'bg-studio-accent border-transparent text-white'
                            : 'bg-white/5 border-studio-border text-studio-text-secondary hover:text-white hover:border-white/15'
                        }`}
                      >
                        {bud.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tell us details field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="details" className="font-mono text-[10px] uppercase text-studio-text-secondary tracking-wider">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="details"
                    rows={5}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-[#111] border border-studio-border focus:border-studio-accent rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                    placeholder="Describe your goals, requirements, constraints, and how we can help..."
                  />
                  {errors.details && <span className="text-red-400 font-mono text-[10px]">{errors.details}</span>}
                </div>

                {/* Submit button */}
                <Button
                  id="submit-proposal"
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center py-4 text-base rounded-xl font-mono text-xs cursor-pointer"
                >
                  {isSubmitting ? 'TRANSMITTING ENCRYPTED...' : 'TRANSMIT PROPOSAL'}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-studio-card/50 border-2 border-studio-accent/30 p-8 md:p-12 rounded-2xl text-center space-y-6 shadow-2xl shadow-studio-accent/5 relative overflow-hidden"
              >
                {/* Visual glow particle backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-studio-accent/15 blur-[50px] pointer-events-none" />

                <CheckCircle className="w-16 h-16 text-studio-accent mx-auto" />
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white">Proposal Transmitted.</h3>
                <p className="text-sm md:text-base text-studio-text-secondary leading-relaxed max-w-lg mx-auto">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Your project brief has been successfully logged inside our secure operations queue. A senior builder will review the parameters and schedule your call.
                </p>
                <div className="font-mono text-[10px] text-studio-text-secondary/60">
                  REF_ID: // {Math.floor(Math.random() * 900000 + 100000)} // RECEIVED_UTC
                </div>
                <div className="pt-4">
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Submit another inquiry
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
