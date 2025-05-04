import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';
import { getFileBySlug } from '@/app/libs/mdx';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Generate dynamic metadata for blog post
export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getFileBySlug(params.slug);

    return [
      {
        id: 'og',
        alt: post.frontMatter.title,
        size,
        contentType,
      },
    ];
  } catch (error) {
    console.error('Error generating metadata:', error);
    return [
      {
        id: 'og',
        alt: `Blog post | ${siteConfig.title}`,
        size,
        contentType,
      },
    ];
  }
}

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getFileBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching post:', error);
    // Return a fallback image if the post can't be fetched
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '1200px',
            height: '630px',
            backgroundColor: '#18181B',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <h1 style={{ fontSize: 60 }}>Blog Post</h1>
        </div>
      ),
      { ...size }
    );
  }

  const { frontMatter } = post;
  const title = frontMatter.title;
  const description = frontMatter.description || '';
  const date = frontMatter.date ? new Date(frontMatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';

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

            {/* Date information */}
            {date && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 40px',
                color: '#999',
                fontSize: 16,
              }}>
                {date}
              </div>
            )}
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
                fontSize: 48,
                fontWeight: 700,
                margin: 0,
                marginBottom: description ? 20 : 0,
                color: 'white',
                lineHeight: 1.2,
              }}>
                {title}
              </h1>
              {description && (
                <p style={{
                  fontSize: 24,
                  color: '#CCC',
                  margin: 0,
                  marginBottom: 30,
                  lineHeight: 1.4,
                }}>
                  {description}
                </p>
              )}
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
            {`${siteConfig.url.replace('https://', '')}/blog/${params.slug}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 