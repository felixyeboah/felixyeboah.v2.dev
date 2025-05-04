import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OG Image Troubleshooting</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            background: #f5f5f5;
          }
          h1, h2, h3 {
            color: #333;
          }
          pre {
            background: #f1f1f1;
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
          }
          code {
            font-family: monospace;
            background: #eee;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
          }
          .note {
            background: #e7f3fe;
            border-left: 4px solid #2196F3;
            padding: 1rem;
            margin: 1rem 0;
          }
          a {
            color: #0070f3;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .btn {
            display: inline-block;
            background: #0070f3;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            margin-top: 1rem;
          }
          .btn:hover {
            background: #005cc5;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <h1>Vercel OG Image Troubleshooting</h1>
        
        <div class="note">
          <strong>Note:</strong> The @vercel/og package requires the Edge Runtime to function properly.
        </div>
        
        <h2>Test URLs</h2>
        <ul>
          <li><a href="/api/og/simple" target="_blank">Simple Test</a> - Minimal OG image to test basic functionality</li>
          <li><a href="/api/og" target="_blank">Default OG</a> - Your site's default OG image</li>
          <li><a href="/api/og/debug" target="_blank">Debug Page</a> - Visual debugging of various OG images</li>
          <li><a href="/api/og/test" target="_blank">Interactive Test</a> - Create and test custom OG images</li>
        </ul>
        
        <h2>Common Issues</h2>
        
        <h3>1. Images not showing in development</h3>
        <p>
          The Vercel OG Image library sometimes has issues in local development. If you see "Failed to load image" but no errors in the console, 
          the issue is likely related to font loading or the Edge Runtime environment in development mode.
        </p>
        <p>
          <strong>Solution:</strong> Deploy to Vercel to test in production, where the Edge Runtime is fully supported.
        </p>
        
        <h3>2. Font loading issues</h3>
        <p>
          Custom fonts need to be loaded as ArrayBuffers. If fonts don't load, the OG Image generator will fall back to system fonts.
        </p>
        <p>
          <strong>Solution:</strong> Use system fonts instead, or ensure your font loading code is correctly implemented.
        </p>
        
        <h3>3. Social media platforms not showing the OG image</h3>
        <p>
          Social media platforms cache OG data. If you've made changes, they might not appear immediately.
        </p>
        <p>
          <strong>Solution:</strong> Use these tools to refresh the cache:
        </p>
        <ul>
          <li><a href="https://developers.facebook.com/tools/debug/" target="_blank">Facebook Sharing Debugger</a></li>
          <li><a href="https://cards-dev.twitter.com/validator" target="_blank">Twitter Card Validator</a></li>
          <li><a href="https://www.linkedin.com/post-inspector/" target="_blank">LinkedIn Post Inspector</a></li>
        </ul>
        
        <h3>4. Error: "The Edge Function "app/api/og/route.ts" failed to respond"</h3>
        <p>
          This usually happens when there's an error in your OG image generation code.
        </p>
        <p>
          <strong>Solution:</strong> Start with the simple test (/api/og/simple) to confirm basic functionality.
          Then gradually add complexity back to identify what's causing the issue.
        </p>
        
        <h2>Deployment Checklist</h2>
        <ul>
          <li>Ensure <code>export const runtime = 'edge';</code> is at the top of your route.tsx file</li>
          <li>Make sure all image URLs are absolute (including protocol and domain)</li>
          <li>Set content-type header: <code>'content-type': 'image/png'</code></li>
          <li>Use system fonts or properly load custom fonts</li>
          <li>Keep the JSX structure simple to avoid rendering issues</li>
        </ul>
        
        <h2>Test In Production</h2>
        <p>
          The most reliable way to test OG images is in production on Vercel. Local development may have limitations
          with the Edge Runtime.
        </p>
        
        <a href="https://vercel.com/docs/functions/edge-functions/og-image-generation" class="btn" target="_blank">
          Vercel OG Image Documentation
        </a>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 