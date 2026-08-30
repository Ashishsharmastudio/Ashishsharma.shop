import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'ai-product-development',
    number: '01',
    title: 'AI Product Development',
    description: 'AI-native products, intelligent features, LLM integrations, and production-ready AI experiences.',
    details: [
      'Custom LLM fine-tuning and system configuration',
      'Retrieval-Augmented Generation (RAG) pipelines',
      'Semantic and vector database search implementation',
      'AI visual, conversational, and voice interface designs'
    ]
  },
  {
    id: 'ux-ui-design',
    number: '02',
    title: 'UX / UI Design',
    description: 'Research-driven interfaces, product strategy, wireframes, prototypes, and scalable design systems.',
    details: [
      'Deep user research, persona modeling, and user testing',
      'Interactive wireframes and rapid clickable prototypes',
      'Scalable design systems for Figma and Tailwind CSS',
      'Aesthetic typography selection and visual layouts'
    ]
  },
  {
    id: 'full-stack-engineering',
    number: '03',
    title: 'Full-Stack Engineering',
    description: 'High-performance frontends, scalable backends, APIs, databases, authentication, and cloud deployment.',
    details: [
      'Next.js, React, and Vite frontend architectures',
      'Fast, secure Express, NestJS, or Node.js APIs',
      'Robust SQL (PostgreSQL, MySQL) and NoSQL database structures',
      'State-of-the-art serverless functions and CDN setups'
    ]
  },
  {
    id: 'ai-agents-automation',
    number: '04',
    title: 'AI Agents & Automation',
    description: 'Intelligent agents and automated workflows connected to the tools businesses already use.',
    details: [
      'LangGraph & LangChain multi-agent orchestration',
      'Custom browser automation and data extraction systems',
      'Self-healing workflows that handle exceptions autonomously',
      'Autonomous client support and outbound pipeline systems'
    ]
  },
  {
    id: 'ai-content-systems',
    number: '05',
    title: 'AI Content Systems',
    description: 'Scalable systems for generating and managing on-brand digital content.',
    details: [
      'Dynamic automated copywriting pipelines',
      'AI-assisted batch imagery and video generation pipelines',
      'Brand style and tone calibration across digital outputs',
      'Headless CMS integrations (Sanity, Strapi, Contentful)'
    ]
  },
  {
    id: 'workflow-integrations',
    number: '06',
    title: 'Workflow & Integrations',
    description: 'APIs, webhooks, CRM integrations, automation platforms, and custom business workflows.',
    details: [
      'Zapier, Make, and custom webhook logic builds',
      'HubSpot, Salesforce, and Zoho API integrations',
      'Real-time Slack, Discord, and Teams notification structures',
      'Performance and sync audit across decentralized tools'
    ]
  }
];
