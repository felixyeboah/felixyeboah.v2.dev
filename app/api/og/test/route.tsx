import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { origin, searchParams } = new URL(req.url);

  // Get parameters from URL or use defaults
  const title = searchParams.get('title') || 'Test Title';
  const subtitle = searchParams.get('subtitle') || 'Test Subtitle';
  const date = searchParams.get('date') || 'Jan 1, 2023';
  const readingTime = searchParams.get('readingTime') || '5 min read';
  const cover = searchParams.get('cover') || '';

  // Generate the OG image URL with the current parameters
  const currentOgUrl = `${origin}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&date=${encodeURIComponent(date)}&readingTime=${encodeURIComponent(readingTime)}${cover ? `&cover=${encodeURIComponent(cover)}` : ''}`;

  // For default OG image
  const defaultOgUrl = `${origin}/api/og`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OG Image Test</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            padding: 2rem;
            max-width: 900px;
            margin: 0 auto;
            background: #f5f5f5;
            color: #333;
          }
          h1 {
            border-bottom: 1px solid #ddd;
            padding-bottom: 0.5rem;
          }
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .preview, .controls {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          .controls {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          label {
            font-weight: 500;
          }
          input, button {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
          }
          button {
            background: #0070f3;
            color: white;
            border: none;
            cursor: pointer;
            font-weight: 500;
            margin-top: 1rem;
          }
          button:hover {
            background: #005cc5;
          }
          img {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .url-display {
            margin-top: 1rem;
            background: #f0f0f0;
            padding: 1rem;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.9rem;
            word-break: break-all;
          }
          .tabs {
            display: flex;
            margin-bottom: 1rem;
            border-bottom: 1px solid #ddd;
          }
          .tab {
            padding: 0.5rem 1rem;
            cursor: pointer;
            margin-right: 0.5rem;
            border-radius: 4px 4px 0 0;
          }
          .tab.active {
            background: #0070f3;
            color: white;
          }
        </style>
      </head>
      <body>
        <h1>OG Image Test</h1>
        
        <div class="tabs">
          <div class="tab active" onclick="showTab('custom')">Custom OG Image</div>
          <div class="tab" onclick="showTab('default')">Default OG Image</div>
        </div>
        
        <div class="container">
          <div class="preview">
            <h2>Preview</h2>
            <div id="customPreview">
              <img src="${currentOgUrl}" alt="OG Image Preview" width="600" id="ogPreview" />
              <div class="url-display" id="ogUrl">${currentOgUrl}</div>
            </div>
            <div id="defaultPreview" style="display:none;">
              <img src="${defaultOgUrl}" alt="Default OG Image Preview" width="600" />
              <div class="url-display">${defaultOgUrl}</div>
            </div>
          </div>
          
          <div class="controls">
            <h2>Parameters</h2>
            <form id="ogForm">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value="${title}" />
              </div>
              <div class="form-group">
                <label for="subtitle">Subtitle</label>
                <input type="text" id="subtitle" name="subtitle" value="${subtitle}" />
              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input type="text" id="date" name="date" value="${date}" />
              </div>
              <div class="form-group">
                <label for="readingTime">Reading Time</label>
                <input type="text" id="readingTime" name="readingTime" value="${readingTime}" />
              </div>
              <div class="form-group">
                <label for="cover">Cover Image URL (optional)</label>
                <input type="text" id="cover" name="cover" value="${cover}" />
              </div>
              <button type="submit">Update Preview</button>
            </form>
          </div>
        </div>
        
        <script>
          document.getElementById('ogForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const subtitle = document.getElementById('subtitle').value;
            const date = document.getElementById('date').value;
            const readingTime = document.getElementById('readingTime').value;
            const cover = document.getElementById('cover').value;
            
            // Create the OG image URL
            const ogUrl = \`${origin}/api/og?title=\${encodeURIComponent(title)}&subtitle=\${encodeURIComponent(subtitle)}&date=\${encodeURIComponent(date)}&readingTime=\${encodeURIComponent(readingTime)}\${cover ? \`&cover=\${encodeURIComponent(cover)}\` : ''}\`;
            
            // Update the preview
            document.getElementById('ogPreview').src = ogUrl;
            document.getElementById('ogUrl').textContent = ogUrl;
            
            // Update the browser URL so it can be shared or refreshed
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('title', title);
            currentUrl.searchParams.set('subtitle', subtitle);
            currentUrl.searchParams.set('date', date);
            currentUrl.searchParams.set('readingTime', readingTime);
            if (cover) {
              currentUrl.searchParams.set('cover', cover);
            } else {
              currentUrl.searchParams.delete('cover');
            }
            window.history.pushState({}, '', currentUrl);
          });
          
          function showTab(tab) {
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(t => t.classList.remove('active'));
            if (tab === 'custom') {
              document.getElementById('customPreview').style.display = 'block';
              document.getElementById('defaultPreview').style.display = 'none';
              tabs[0].classList.add('active');
            } else {
              document.getElementById('customPreview').style.display = 'none';
              document.getElementById('defaultPreview').style.display = 'block';
              tabs[1].classList.add('active');
            }
          }
        </script>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 