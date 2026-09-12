import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ai-commerce-platform',
    title: 'AI Commerce Platform',
    subtitle: 'Reimagining retail with intelligent multi-agent commerce pipelines.',
    category: 'AI Commerce + Automation',
    year: '2026',
    client: 'Veloce Retail Corp',
    services: ['AI Product Development', 'Full-Stack Engineering', 'UX/UI Design', 'AI Agents & Automation'],
    challenge: 'Veloce Retail operated a massive catalog of 200,000+ custom products with legacy inventory management and search engines. Customers struggled to find complex custom parts, resulting in drop-offs. Manual inventory tracking and content generation for product listings was costing thousands of developer hours annually.',
    strategy: 'We designed a conversational commerce interface integrated directly with an LLM-powered multi-agent system. The strategy focused on a zero-friction purchase flow where users search using natural intent (e.g., "Find me a rugged camera mount that fits a 2024 Jeep Wrangler roll cage"), while background agents automatically index stock, validate compatibility, and generate optimized checkouts.',
    designProcess: 'Our UX strategy prioritized a split personality approach: a minimalist high-contrast search interface that expands into an interactive 3D product visualizer. We developed a custom design system with ultra-tight spacing, a neutral dark base, and sharp 1px borders to keep focus entirely on product options and details.',
    developmentApproach: 'Built on Next.js 15 and Node.js with Fastify, the platform leverages pgvector on PostgreSQL for high-speed semantic product search. We implemented real-time inventory agents running on LangGraph that coordinate with warehouse APIs, auto-transcribe user constraints, and securely validate orders against custom ERP logic.',
    techStack: ['Next.js', 'TypeScript', 'Fastify', 'pgvector', 'PostgreSQL', 'LangChain', 'Tailwind CSS', 'Framer Motion'],
    image: 'bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-950',
    results: [
      'Conversion rate increased by 42% in the first quarter post-launch.',
      'Manual listing creation time reduced by 94% through autonomous description agents.',
      'Average order value boosted by 28% via dynamic intelligent accessory recommendations.'
    ],
    keyMetrics: [
      { value: '+42%', label: 'Conversion Lift' },
      { value: '200k+', label: 'Products Indexed' },
      { value: '<120ms', label: 'Semantic Search Latency' },
      { value: '94%', label: 'Automation Efficiency' }
    ],
    testimonial: {
      text: "The Digital Product Studio transformed our entire digital commerce stack from a legacy static database into an intelligent, autonomous sales engine. Our customers are absolutely loving the natural language interface.",
      author: "Elena Rostova",
      role: "VP of Product, Veloce Retail"
    }
  },
  {
    id: '2',
    slug: 'real-estate-operations-platform',
    title: 'Real Estate Operations Platform',
    subtitle: 'Streamlining property workflows with high-performance dashboard interfaces.',
    category: 'Product Design + Full-Stack Development',
    year: '2025',
    client: 'Exeter Realty Group',
    services: ['UX/UI Design', 'Full-Stack Engineering', 'Workflow & Integrations'],
    challenge: 'Exeter Group managed billions in real estate assets using decentralized spreadsheets and fragmented SaaS tools. Communication between field agents, legal departments, and asset managers was bottlenecked by slow email updates, and data sync issues caused repeated deal delays.',
    strategy: 'We consolidated all operational pipelines into a unified real-time dashboard. Our strategy centered around a single source of truth for deal status, lease tracking, and legal document statuses, featuring real-time collaborative updates and automated document verification pipelines.',
    designProcess: 'Using a strict 4px grid system and a premium charcoal palette, we designed a high-density tabular dashboard that maintains extreme readability. We integrated custom charting blocks using D3 to track lease expirations and pipeline values visually. Extensive prototyping validated that field agents could close deals 3x faster using the mobile layout.',
    developmentApproach: 'The backend was engineered using high-performance Express APIs paired with Prisma and PostgreSQL. We implemented WebSocket-based live collaboration so all users see contract modifications and state transitions instantaneously. A background worker microservice automatically generates PDF lease agreements using server-side HTML rendering.',
    techStack: ['React', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma', 'Socket.io', 'D3.js', 'Tailwind CSS'],
    image: 'bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950',
    results: [
      'Average deal closure lifecycle reduced from 21 days down to 4 days.',
      'Zero contract discrepancies reported since the deployment of automated verification.',
      'Platform adopted by 100% of internal staff and field brokers within 3 weeks of release.'
    ],
    keyMetrics: [
      { value: '5.2x', label: 'Workflow Velocity' },
      { value: '$1.2B', label: 'Assets Managed' },
      { value: '100%', label: 'Data Accuracy' },
      { value: '<4d', label: 'Avg Deal Cycle' }
    ],
    testimonial: {
      text: "Operating our portfolios in Excel was holding our business back. The platform they built gave us the visibility and speed required to scale our acquisitions ten-fold.",
      author: "Markus Vance",
      role: "Managing Director, Exeter Realty"
    }
  },
  {
    id: '3',
    slug: 'business-intelligence-dashboard',
    title: 'Business Intelligence Dashboard',
    subtitle: 'Democratizing multi-layered telemetry data for hardware operations.',
    category: 'UX + Data Visualization',
    year: '2025',
    client: 'Helix Robotics Corp',
    services: ['UX/UI Design', 'Full-Stack Engineering', 'AI Content Systems'],
    challenge: 'Helix Robotics builds complex autonomous manufacturing arms. Their clients had difficulty understanding real-time performance telemetry, leading to unpredicted equipment wear and high maintenance overhead. The existing interface was slow and required advanced database querying.',
    strategy: 'We built a high-performance visual dashboard that renders webGL-based 3D models of the robotic arms alongside instantaneous time-series visualizers. We also integrated an AI performance analyst that translates telemetry spikes into clear, human-readable operational maintenance plans.',
    designProcess: 'Our design took severe inspiration from advanced flight control decks. We utilized dark deep-space blues, neon telemetry lines, and custom monospace layouts to present heavy tabular information elegantly. Micro-interactions were added to every data point, giving the user tactile control when inspecting hardware historical performance.',
    developmentApproach: 'We leveraged React, Vite, and Canvas2D alongside Recharts for fluid data rendering. To handle massive streams of hardware data, we engineered an active client-side buffer system that minimizes React re-renders, enabling the app to render over 10,000 telemetry points per second at a consistent 60fps.',
    techStack: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS', 'Vite', 'Framer Motion', 'WebSockets'],
    image: 'bg-gradient-to-tr from-neutral-950 via-slate-950 to-neutral-900',
    results: [
      'Hardware downtime reduced by 34% through proactive predictive maintenance alerts.',
      'Telemetry load speeds improved by 10x using client-side WebAssembly parsing.',
      'Training time for factory operators reduced from 2 weeks to a single 20-minute session.'
    ],
    keyMetrics: [
      { value: '34%', label: 'Downtime Reduction' },
      { value: '10k+', label: 'Metrics/sec Rendered' },
      { value: '60fps', label: 'Rendering Rate' },
      { value: '10x', label: 'Telemetry Load' }
    ],
    testimonial: {
      text: "This dashboard makes thousands of complex sensory parameters instantly understandable to our shop floor technicians. It's an absolute game changer for industrial predictive maintenance.",
      author: "Dr. Alistair Sterling",
      role: "Chief Technology Officer, Helix Robotics"
    }
  },
  {
    id: '4',
    slug: 'ai-lead-qualification-system',
    title: 'AI Lead Qualification System',
    subtitle: 'Accelerating enterprise revenue with automated agentic outreach pipelines.',
    category: 'AI Agents + Workflow Automation',
    year: '2026',
    client: 'Nexus SaaS Group',
    services: ['AI Agents & Automation', 'Workflow & Integrations', 'Full-Stack Engineering'],
    challenge: 'Nexus SaaS received over 50,000 inbound signups monthly, but their sales team was overwhelmed by manual qualification tasks. Highly valuable enterprise leads were sitting untouched in a crowded database for days, leading to high churn rates and lost deals.',
    strategy: 'We built an agentic qualification system. Immediately upon signup, a multi-agent workflow enriches the lead data using dozens of corporate APIs, performs competitor analysis, crafts a hyper-personalized outreach proposal, and triggers multi-channel automated engagement.',
    designProcess: 'We designed an interactive pipeline visualizer that lets sales directors watch leads flow through agent nodes in real-time. By styling the flow with glowing nodes, clean visual triggers, and smooth transition lines, we turned complex automated logic into a beautiful, intuitive control map.',
    developmentApproach: 'The system runs on serverless architecture with Node.js and integrates directly with OpenAI and Claude APIs. We used Redis queues to scale with extreme traffic peaks, and built custom webhooks to push qualified leads directly into CRM systems (Salesforce, HubSpot) alongside enriched profiles and tailored talk tracks.',
    techStack: ['React', 'Node.js', 'Express', 'TypeScript', 'Redis', 'Tailwind CSS', 'Framer Motion', 'OpenAI SDK'],
    image: 'bg-gradient-to-br from-violet-950 via-neutral-950 to-purple-950',
    results: [
      'Inbound response times dropped from 48 hours to a consistent 90 seconds.',
      'Sales pipeline value increased by 56% due to automated immediate outreach.',
      'Outreach engagement response rates increased by 310% compared to generic static mailers.'
    ],
    keyMetrics: [
      { value: '90s', label: 'Response Time' },
      { value: '56%', label: 'Pipeline Increase' },
      { value: '310%', label: 'Outreach Uplift' },
      { value: '50k+', label: 'Leads Processed' }
    ],
    testimonial: {
      text: "Our sales team is now talking only to high-value leads that have been fully qualified and pre-educated by the AI agents. This platform has completely supercharged our pipeline.",
      author: "Samantha Cole",
      role: "VP of Business Development, Nexus SaaS"
    }
  }
];
