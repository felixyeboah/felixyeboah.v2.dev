import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  const date = searchParams.get('date');
  const readingTime = searchParams.get('readingTime');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          backgroundColor: '#0D1117',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            padding: '40px 50px',
            backgroundColor: '#161B22',
            borderRadius: '12px',
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontFamily: 'Inter',
              color: '#E6EDF3',
              lineHeight: 1.2,
              marginBottom: 'auto',
            }}
          >
            {title}
          </h1>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <img
              src="https://github.com/felixyeboah.png"
              width="48"
              height="48"
              style={{
                borderRadius: '24px',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <p
                style={{
                  fontSize: 24,
                  color: '#E6EDF3',
                  margin: 0,
                }}
              >
                Felix Yeboah
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#7D8590',
                  fontSize: 20,
                }}
              >
                <span>{date}</span>
                <span>•</span>
                <span>{readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}