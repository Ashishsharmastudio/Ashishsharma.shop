import sanitizeHtml from 'sanitize-html';

/**
 * 10-Point Production HTML Sanitizer for Blog Article Content.
 * Strictly strips scripts, styles, objects, iframes, inline event handlers,
 * protocol-relative URLs, and unapproved attributes.
 */
export function sanitizeBlogContent(dirtyHtml: string): string {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') {
    return '';
  }

  return sanitizeHtml(dirtyHtml, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'b', 'strong',
      'i', 'em', 'u', 's', 'strike', 'ul', 'ol', 'li', 'pre', 'code',
      'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'figure', 'figcaption', 'img', 'span', 'hr', 'br', 'div'
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel', 'class'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class'],
      div: ['class'],
      span: ['class'],
      p: ['class'],
      pre: ['class'],
      code: ['class'],
      table: ['class'],
      thead: ['class'],
      tbody: ['class'],
      tr: ['class'],
      th: ['class'],
      td: ['class'],
      blockquote: ['class'],
      h1: ['class'],
      h2: ['class'],
      h3: ['class'],
      h4: ['class'],
      h5: ['class'],
      h6: ['class'],
      ul: ['class'],
      ol: ['class'],
      li: ['class'],
      figure: ['class'],
      figcaption: ['class'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        if (attribs.target === '_blank') {
          attribs.rel = 'noopener noreferrer';
        }
        return { tagName, attribs };
      },
    },
  });
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
