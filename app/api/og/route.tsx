import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const runtime = 'edge';

// Font loading is currently not working with local font files
// Using a web-safe font instead for now
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    const cover = searchParams.get('cover');
    const date = searchParams.get('date');
    const subtitle = searchParams.get('subtitle');
    const readingTime = searchParams.get('readingTime');

    // If no title is provided, generate the default OG image
    if (!title) {
        return generateDefaultOGImage();
    }

    // Generate blog post OG image
    return new ImageResponse(
        React.createElement(
            'div',
            {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '1200px',
                    height: '630px',
                    backgroundColor: '#232323',
                    color: 'white',
                    fontSize: 48,
                },
            },
            'OG Test'
        ),
        {
            width: 1200,
            height: 630,
            headers: {
                'content-type': 'image/png',
                'cache-control': 'public, max-age=31536000, immutable',
            },
        }
    );
}

function generateDefaultOGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '630px',
                    width: '1200px',
                    backgroundColor: '#232323',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* Backdrop blur effect */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backdropFilter: 'blur(16px)',
                    }}
                />

                {/* Main content */}
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    {/* Header section */}
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '80px',
                            borderBottom: '1px solid #393939',
                            borderTop: '1px solid #393939',
                            position: 'relative',
                        }}
                    >
                        {/* Corner + elements */}
                        <div style={{ position: 'absolute', top: 0, left: 0, transform: 'translate(-50%, -50%)', display: 'flex' }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', display: 'flex' }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'translate(-50%, 50%)', display: 'flex' }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', display: 'flex' }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>

                        {/* Logo section */}
                        <div
                            style={{
                                flex: 1,
                                borderRight: '1px solid #393939',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '16px'
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', display: 'flex' }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', display: 'flex' }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>

                            <h3 style={{ fontSize: 24, color: 'white', fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>
                                Felix
                            </h3>
                        </div>

                        {/* Other sections */}
                        <div style={{ flex: 3, display: 'flex' }}>
                            <div style={{
                                flex: 1,
                                borderRight: '1px solid #393939',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', display: 'flex' }}>
                                    <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', display: 'flex' }}>
                                    <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                                </div>
                                <p style={{ color: 'white', fontSize: 16, fontFamily: 'system-ui, sans-serif' }}>About</p>
                            </div>
                            <div style={{
                                flex: 1,
                                borderRight: '1px solid #393939',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', display: 'flex' }}>
                                    <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', display: 'flex' }}>
                                    <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                                </div>
                                <p style={{ color: 'white', fontSize: 16, fontFamily: 'system-ui, sans-serif' }}>Cases</p>
                            </div>
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <p style={{ color: 'white', fontSize: 16, fontFamily: 'system-ui, sans-serif' }}>Blog</p>
                            </div>
                        </div>
                    </div>

                    {/* Main title section */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0 60px',
                            height: '100%'
                        }}
                    >
                        <h1
                            style={{
                                color: 'white',
                                fontSize: 72,
                                fontWeight: 700,
                                textAlign: 'center',
                                margin: 0,
                                fontFamily: 'system-ui, sans-serif'
                            }}
                        >
                            Felix Yeboah
                        </h1>
                        <p
                            style={{
                                color: 'rgba(255,255,255,0.8)',
                                fontSize: 28,
                                textAlign: 'center',
                                margin: '20px 0 0 0',
                                fontFamily: 'system-ui, sans-serif'
                            }}
                        >
                            Software Engineer & Designer
                        </p>
                    </div>

                    {/* Footer section */}
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '158px',
                            borderTop: '1px solid #393939',
                            borderBottom: '1px solid #393939',
                            display: 'flex',
                            backgroundColor: '#232323',
                        }}
                    >
                        {/* Corner + elements */}
                        <div style={{ position: 'absolute', top: 0, left: 0, transform: 'translate(-50%, -50%)', display: 'flex' }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', display: 'flex' }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'translate(-50%, 50%)', display: 'flex' }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', display: 'flex' }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>

                        {/* Box with tagline */}
                        <div
                            style={{
                                flex: 1,
                                borderRight: '1px solid #393939',
                                position: 'relative',
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', display: 'flex' }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', display: 'flex' }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.4, fontFamily: 'system-ui, sans-serif' }}>
                                Designing for a<br />connected world.
                            </div>
                        </div>

                        {/* Other sections */}
                        <div
                            style={{
                                flex: 1,
                                borderRight: '1px solid #393939',
                                position: 'relative',
                                padding: '16px',
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', display: 'flex' }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', display: 'flex' }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                borderRight: '1px solid #393939',
                                position: 'relative',
                                padding: '16px',
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', display: 'flex' }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', display: 'flex' }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                position: 'relative',
                                padding: '16px',
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
                'content-type': 'image/png',
                'cache-control': 'public, max-age=31536000, immutable',
            },
        },
    );
}
