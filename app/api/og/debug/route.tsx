import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { origin } = new URL(req.url);

  // Generate sample OG image URLs
  const defaultOgUrl = `${origin}/api/og`;
  const simpleOgUrl = `${origin}/api/og/simple`;
  const blogOgUrl = `${origin}/api/og?title=Example%20Blog%20Post&subtitle=This%20is%20a%20test%20blog%20post&date=May%2020,%202023&readingTime=5%20min%20read`;
  const caseStudyOgUrl = `${origin}/api/og?title=Example%20Case%20Study&subtitle=This%20is%20a%20test%20case%20study&date=May%2020,%202023`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OG Image Debug</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            padding: 2rem;
            max-width: 900px;
            margin: 0 auto;
            background: #f5f5f5;
          }
          h1 {
            border-bottom: 1px solid #ddd;
            padding-bottom: 0.5rem;
          }
          .preview {
            margin-bottom: 2rem;
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          h2 {
            margin-top: 0;
          }
          img {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .info {
            margin-top: 1rem;
            background: #f0f0f0;
            padding: 1rem;
            border-radius: 4px;
            font-family: monospace;
            white-space: pre-wrap;
            overflow-x: auto;
          }
          a {
            color: #0070f3;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>OG Image Debug</h1>
        
        <div class="preview">
          <h2>Simple OG Image Test</h2>
          <img src="${simpleOgUrl}" alt="Simple OG Image" width="600" />
          <div class="info">
            <a href="${simpleOgUrl}" target="_blank">Open in new tab</a>
            <br>
            URL: ${simpleOgUrl}
          </div>
        </div>
        
        <div class="preview">
          <h2>Default OG Image</h2>
          <img src="${defaultOgUrl}" alt="Default OG Image" width="600" />
          <div class="info">
            <a href="${defaultOgUrl}" target="_blank">Open in new tab</a>
            <br>
            URL: ${defaultOgUrl}
          </div>
        </div>
        
        <div class="preview">
          <h2>Blog Post OG Image</h2>
          <img src="${blogOgUrl}" alt="Blog Post OG Image" width="600" />
          <div class="info">
            <a href="${blogOgUrl}" target="_blank">Open in new tab</a>
            <br>
            URL: ${blogOgUrl}
          </div>
        </div>
        
        <div class="preview">
          <h2>Case Study OG Image</h2>
          <img src="${caseStudyOgUrl}" alt="Case Study OG Image" width="600" />
          <div class="info">
            <a href="${caseStudyOgUrl}" target="_blank">Open in new tab</a>
            <br>
            URL: ${caseStudyOgUrl}
          </div>
        </div>
        
        <h2>Troubleshooting Tips</h2>
        <ul>
          <li>Vercel Edge Functions require <code>runtime = 'edge'</code> - check that it's set in your <code>route.tsx</code> file</li>
          <li>OG images may not show in localhost social media debuggers - you need to test on the deployed version</li>
          <li>Make sure your OG URLs are absolute (including protocol and domain)</li>
          <li>Check the Vercel function logs if you're having issues in production</li>
          <li>Try using Facebook's <a href="https://developers.facebook.com/tools/debug/" target="_blank">Sharing Debugger</a> to check your production URLs</li>
        </ul>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 