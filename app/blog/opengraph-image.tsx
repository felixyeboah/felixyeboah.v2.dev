import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

// Image metadata
export const alt = `Blog | ${siteConfig.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          backgroundColor: '#18181B',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background grid with plus icons */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          borderTop: '1px solid #333',
          borderBottom: '1px solid #333',
          margin: '40px',
        }}>
          {/* Header row */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #333',
            height: '80px',
            position: 'relative',
          }}>
            {/* Plus icons at the corners of the header */}
            <div style={{ position: 'absolute', top: -5, left: -5, color: '#666', fontSize: 18 }}>+</div>
            <div style={{ position: 'absolute', top: -5, right: -5, color: '#666', fontSize: 18 }}>+</div>
            <div style={{ position: 'absolute', bottom: -5, left: -5, color: '#666', fontSize: 18 }}>+</div>
            <div style={{ position: 'absolute', bottom: -5, right: -5, color: '#666', fontSize: 18 }}>+</div>

            {/* Blog section identifier */}
            <div style={{
              width: '220px',
              borderRight: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 500,
            }}>
              Blog
            </div>
          </div>

          {/* Main content area */}
          <div style={{
            flex: 1,
            display: 'flex',
            position: 'relative',
          }}>
            {/* Title and content */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 40px',
            }}>
              <h1 style={{
                fontSize: 54,
                fontWeight: 700,
                margin: 0,
                marginBottom: 20,
                color: 'white',
                lineHeight: 1.2,
              }}>
                Insights & Articles
              </h1>
              <p style={{
                fontSize: 24,
                color: '#CCC',
                margin: 0,
                marginBottom: 30,
                lineHeight: 1.4,
              }}>
                Thoughts on software development, design, and technology
              </p>
            </div>
          </div>

          {/* Footer with metadata */}
          <div style={{
            height: '60px',
            borderTop: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            padding: '0 40px',
            color: '#999',
            fontSize: 18,
          }}>
            {`${siteConfig.url.replace('https://', '')}/blog`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 