import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    const cover = searchParams.get('cover');
    const date = searchParams.get('date');
    const subtitle = searchParams.get('subtitle');
    const readingTime = searchParams.get('readingTime');

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '630px',
                    width: '1200px',
                    backgroundColor: '#f4f4f4',
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '50%',
                                height: 15,
                                backgroundColor: '#FF7009',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '50%',
                                height: 15,
                                backgroundColor: '#003D29',
                            }}
                        />

                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                padding: '40px',
                                gap: '12px',
                                zIndex: 1,
                            }}
                        >
                            <div
                                style={{
                                    width: '65%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '20px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px',
                                        }}
                                    >
                                        <h1
                                            style={{
                                                fontSize: 64,
                                                color: '#000',
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {title}
                                        </h1>
                                        <p
                                            style={{
                                                fontSize: 20,
                                                color: '#3D3D3D',
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            {subtitle}
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            color: '#7D8590',
                                            fontSize: 16,
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
                                                margin: 0,
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
                                    height: '100%',
                                    display: 'flex',
                                }}
                            >
                                {cover ? (
                                    <img
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                        }}
                                        src={cover}
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
                                        <span style={{ color: '#9ca3af' }}>
                                            No image
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '50%',
                                height: 15,
                                backgroundColor: '#FF7009',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '50%',
                                height: 15,
                                backgroundColor: '#003D29',
                            }}
                        />
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
