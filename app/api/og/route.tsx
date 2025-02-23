import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    const cover = searchParams.get('cover');
    const date = searchParams.get('date');
    const readingTime = searchParams.get('readingTime');

    // Fetch the image first to ensure it's available
    let imageData: string | null = null;
    if (cover) {
        try {
            const imageResponse = await fetch(cover);
            const arrayBuffer = await imageResponse.arrayBuffer();
            imageData = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
        } catch (e) {
            console.error('Error fetching cover image:', e);
        }
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    height: '400px',
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            width: '100%',
                            height: 15,
                            backgroundColor: 'oklch(70.91% 0.196 46.35)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            inset: 0,
                            width: '50%',
                            height: 15,
                            backgroundColor: 'oklch(31.87% 0.0679 164.02)',
                        }}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                    }}
                >
                    <div
                        style={{
                            width: '65%',
                            padding: '60px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <div>
                            <h1
                                style={{
                                    fontSize: 45,
                                    fontFamily:
                                        'var(--font-aperku-sans), sans-serif',
                                    color: '#000',
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

                        <div
                            style={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'flex-end',
                            }}
                        >
                            <img
                                src="https://github.com/felixyeboah.png"
                                alt="Felix"
                                width="64"
                                height="64"
                                style={{
                                    borderRadius: '6px',
                                }}
                            />

                            <div>
                                <p
                                    style={{
                                        fontSize: 24,
                                        color: 'oklch(0.372 0.044 257.287)',
                                        margin: 0,
                                    }}
                                >
                                    Felix Yeboah
                                </p>
                                <p
                                    style={{
                                        fontSize: 15,
                                        color: 'oklch(0.704 0.04 256.788)',
                                    }}
                                >
                                    @sudocode_
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            width: '35%',
                        }}
                    >
                        {imageData ? (
                            <img
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                                src={imageData}
                                alt={title ?? ''}
                            />
                        ) : (
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: '#f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span style={{ color: '#9ca3af' }}>No image</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: {
                'cache-control': 'public, max-age=31536000, immutable',
            },
        },
    );
}
