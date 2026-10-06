/**
 * Google Analytics 4 & Google Tag Manager Event Tracking Utility.
 * Dispatches directly to window.gtag and window.dataLayer.
 */

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag?: (...args: any[]) => void;
  }
}

// Ensure dataLayer exists
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

/**
 * Dispatches a virtual pageview to GA4 on SPA route transitions.
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined') return;

  const pageTitle = title || document.title;
  const pageLocation = window.location.origin + path;

  // 1. Direct GA4 delivery
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: pageTitle,
      page_location: pageLocation,
    });
  }

  // 2. DataLayer fallback
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_title: pageTitle,
      page_location: pageLocation,
    });
  }
}

/**
 * Generic event dispatcher.
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // 1. Direct GA4 delivery
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  // 2. DataLayer fallback
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
      timestamp: new Date().toISOString(),
    });
  }
}

// =============================================================================
// HIGH-VALUE COMMERCIAL B2B KEY EVENTS
// =============================================================================

/**
 * Key Event 1: Cal.com Discovery Call Booking Click.
 */
export function trackCalBookingClick(sourceLocation: string) {
  trackEvent('book_call_click', {
    event_category: 'Conversion',
    event_label: 'Cal.com Systems Call',
    source_location: sourceLocation,
    value: 500,
    currency: 'USD',
  });
}

/**
 * Key Event 2: Live Sandbox Launch (AuditTrust / Reset Pods).
 */
export function trackLiveSandboxLaunch(projectName: string, targetUrl: string) {
  trackEvent('launch_live_sandbox', {
    event_category: 'Proof of Work',
    project_name: projectName,
    target_url: targetUrl,
  });
}

/**
 * Key Event 3: Project Proposal Form Submission (/contact).
 */
export function trackProposalSubmission(projectType: string, budget: string, clientName: string) {
  trackEvent('generate_lead', {
    event_category: 'Lead Acquisition',
    project_type: projectType,
    estimated_budget: budget,
    client_name: clientName,
    value: 1000,
    currency: 'USD',
  });
}

/**
 * Key Event 4: Outbound GitHub Repository Code Inspection.
 */
export function trackGitHubInspection(repoName: string, repoUrl: string) {
  trackEvent('view_github_architecture', {
    event_category: 'Technical Proof',
    repository_name: repoName,
    target_url: repoUrl,
  });
}