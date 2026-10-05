import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'workflow-to-system-engineering',
    number: '01',
    title: 'Workflow-to-System Engineering',
    description: 'Converting high-friction operational workflows, manual email coordination, and spreadsheets into custom deterministic software systems.',
    details: [
      'Comprehensive manual process teardowns & state modeling',
      'Deterministic state machines replacing tribal knowledge',
      'Automated handoff protocols with replayable audit trails',
      'Linear margin & price boundary enforcement algorithms',
    ],
  },
  {
    id: 'hitl-agentic-systems',
    number: '02',
    title: 'Human-in-the-Loop Agentic Systems',
    description: 'Autonomous execution engines paired with low-latency exception review tables where human operators sign off on borderline decisions.',
    details: [
      'Fast-path sub-second execution for nominal transactions',
      'Thresholded escalation tables with pre-calculated diffs',
      'Single-click SSO/WebAuthn approvals for senior operators',
      'Hallucination-free action execution via typed schemas',
    ],
  },
  {
    id: 'document-spec-extraction',
    number: '03',
    title: 'Zero-Hallucination Document Pipelines',
    description: 'Transforming messy multi-page PDF rate confirmations, technical specs, and clinical intake forms into strictly validated Pydantic models.',
    details: [
      'Multi-pass AST token coordinate reconciliation',
      'Mathematical parity verification (sums equal grand total)',
      'Deterministic schema validation with immediate circuit breakers',
      'High-throughput asynchronous ingestion queues via Redis',
    ],
  },
  {
    id: 'legacy-system-connectors',
    number: '04',
    title: 'Legacy TMS & ERP Connectors',
    description: 'Bridging modern autonomous software with legacy enterprise backbones (McLeod, TMW, SAP, Epic, Salesforce) without brittle browser RPA.',
    details: [
      'Event-driven webhook buffers and idempotent queue workers',
      'Direct database synchronization with rollback safety',
      'Distributed Redis leasing to eliminate ghost race conditions',
      'Elimination of manual re-keying between disconnected tools',
    ],
  },
  {
    id: 'realtime-voice-ai-gateways',
    number: '05',
    title: 'Sub-500ms Voice AI Gateways',
    description: 'Deploying realtime conversational voice agents on top of existing enterprise PBX and SIP phone trunks for autonomous triage and dispatch.',
    details: [
      'SIP-to-WebRTC audio transcoding pipelines (mu-law to Opus)',
      'Interruption-aware Turn Detection with sub-300ms latency',
      'Direct database lookup during active phone conversations',
      'Instant warm-transfer escalation to human specialists',
    ],
  },
  {
    id: 'operational-telemetry-optimization',
    number: '06',
    title: 'Operational Telemetry & Governance',
    description: 'Real-time observability platforms tracking transaction velocity, operator override frequency, and automated throughput.',
    details: [
      'Granular latency and cost-per-transaction telemetry',
      'Operator decision auditing to improve autonomous confidence',
      'Strict SOC 2, HIPAA, and GDPR isolation patterns',
      'Pushing touchless operations from 70% toward 95%',
    ],
  },
];