/**
 * Zero-Dependency, Native ESM 10-Point HTML Sanitizer for Blog Article Content.
 * Eliminates all CommonJS/bundling hazards in serverless runtimes.
 * Strictly enforces:
 * 1. Whitelisted tags only
 * 2. Whitelisted attributes only
 * 3. Strips all inline event handlers (on*)
 * 4. Strips <script>, <iframe>, <object>, <embed>, <style>
 * 5. Restricts URL schemes to https, http, mailto, or relative /
 * 6. Strips protocol-relative URLs (//)
 * 7. Strips all style attributes
 * 8. Enforces rel="noopener noreferrer" on target="_blank"
 * 9. Sanitizes content before embedding
 * 10. Independent metadata escaping
 */

const ALLOWED_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'b', 'strong',
  'i', 'em', 'u', 's', 'strike', 'ul', 'ol', 'li', 'pre', 'code',
  'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'figure', 'figcaption', 'img', 'span', 'hr', 'br', 'div'
]);

const ALLOWED_ATTRS = new Set([
  'href', 'src', 'alt', 'title', 'target', 'rel', 'class', 'width', 'height', 'loading'
]);

export function sanitizeBlogContent(dirtyHtml: string): string {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') {
    return '';
  }

  // 1. Strip entire dangerous blocks including contents
  let clean = dirtyHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');

  // 2. Process all remaining HTML tags
  clean = clean.replace(/<\/?([a-zA-Z0-9_-]+)([^>]*)>/gi, (match, rawTagName, rawAttrs) => {
    const tagName = rawTagName.toLowerCase();

    // If tag is not in whitelist, strip tag wrapper
    if (!ALLOWED_TAGS.has(tagName)) {
      return '';
    }

    // If closing tag, return clean closing tag
    if (match.startsWith('</')) {
      return `</${tagName}>`;
    }

    const isSelfClosing = match.endsWith('/>') || tagName === 'img' || tagName === 'br' || tagName === 'hr';

    // Parse and filter attributes
    const cleanAttrs: string[] = [];
    let hasTargetBlank = false;
    let explicitRel = '';

    // Regex to match key="value" or key='value' or key=value
    const attrRegex = /([a-zA-Z0-9_-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/gi;
    let attrMatch: RegExpExecArray | null;

    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrVal = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';

      // Strictly ignore any on* event handlers (onclick, onerror, onload, etc.)
      if (attrName.startsWith('on')) {
        continue;
      }

      // Strictly ignore style attributes
      if (attrName === 'style') {
        continue;
      }

      // Only allow approved attribute names
      if (!ALLOWED_ATTRS.has(attrName)) {
        continue;
      }

      // Validate URL schemes for href and src
      if (attrName === 'href' || attrName === 'src') {
        const trimmedVal = attrVal.trim().toLowerCase();

        // Reject javascript:, data: (unless safe image), vbscript:, etc.
        if (
          trimmedVal.startsWith('javascript:') ||
          trimmedVal.startsWith('vbscript:') ||
          (trimmedVal.startsWith('data:') && !trimmedVal.startsWith('data:image/'))
        ) {
          continue;
        }

        // Reject protocol-relative URLs (//)
        if (trimmedVal.startsWith('//')) {
          continue;
        }

        // Must be safe scheme or relative path
        if (
          !trimmedVal.startsWith('https://') &&
          !trimmedVal.startsWith('http://') &&
          !trimmedVal.startsWith('mailto:') &&
          !trimmedVal.startsWith('/') &&
          !trimmedVal.startsWith('#') &&
          !trimmedVal.startsWith('data:image/')
        ) {
          continue;
        }
      }

      if (attrName === 'target' && attrVal === '_blank') {
        hasTargetBlank = true;
      }

      if (attrName === 'rel') {
        explicitRel = attrVal;
        continue; // Handle rel after loop
      }

      cleanAttrs.push(`${attrName}="${escapeHtml(attrVal)}"`);
    }

    // Enforce rel="noopener noreferrer" on target="_blank"
    if (tagName === 'a' && hasTargetBlank) {
      cleanAttrs.push('rel="noopener noreferrer"');
    } else if (explicitRel) {
      cleanAttrs.push(`rel="${escapeHtml(explicitRel)}"`);
    }

    const attrsString = cleanAttrs.length > 0 ? ' ' + cleanAttrs.join(' ') : '';
    return isSelfClosing ? `<${tagName}${attrsString} />` : `<${tagName}${attrsString}>`;
  });

  return clean;
}

/**
 * Escapes characters for safe interpolation into HTML attributes and text nodes.
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Safely serializes objects into JSON for injection inside `<script>` tags,
 * escaping HTML special characters to prevent script termination attacks (</script>).
 */
export function serializeSafeJson(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
