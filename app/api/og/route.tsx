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

    // If no title is provided, generate the default OG image
    if (!title) {
        return generateDefaultOGImage();
    }

    // Generate blog post OG image
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
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                        padding: '40px',
                    }}
                >
                    {/* Header with border */}
                    <div
                        style={{
                            width: '100%',
                            borderBottom: '1px solid #393939',
                            paddingBottom: '20px',
                            position: 'relative',
                        }}
                    >
                        {/* Corner + elements */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'translate(-50%, 50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ fontSize: 24, color: 'white', fontWeight: 500, fontFamily: 'sans-serif' }}>
                                Felix
                            </h3>
                            <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.7)', fontSize: 14, fontFamily: 'sans-serif' }}>
                                {date} {readingTime && `• ${readingTime}`}
                            </div>
                        </div>
                    </div>

                    {/* Content Area with Title, Subtitle and Cover Image */}
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            gap: '40px',
                            marginTop: '40px',
                        }}
                    >
                        {/* Title and subtitle */}
                        <div
                            style={{
                                flex: '0 0 60%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <h1
                                style={{
                                    fontSize: 52,
                                    color: 'white',
                                    lineHeight: 1.2,
                                    margin: 0,
                                    fontWeight: 700,
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                {title}
                            </h1>
                            {subtitle && (
                                <p
                                    style={{
                                        fontSize: 24,
                                        color: 'rgba(255,255,255,0.8)',
                                        lineHeight: 1.4,
                                        marginTop: '20px',
                                        fontFamily: 'sans-serif',
                                    }}
                                >
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* Cover image with border */}
                        <div
                            style={{
                                flex: '0 0 40%',
                                border: '1px solid #393939',
                                position: 'relative',
                                padding: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#1B1B1B',
                            }}
                        >
                            {/* Corner + elements */}
                            <div style={{ position: 'absolute', top: 0, left: 0, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'translate(-50%, 50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>

                            {cover ? (
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                    src={cover}
                                    alt={title}
                                />
                            ) : (
                                <div
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        backgroundColor: '#2A2A2A',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span style={{ color: '#6B6B6B', fontFamily: 'sans-serif' }}>
                                        No image
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer with author info */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '40px',
                            paddingTop: '20px',
                            borderTop: '1px solid #393939',
                            position: 'relative',
                        }}
                    >
                        {/* Corner + elements */}
                        <div style={{ position: 'absolute', top: 0, left: 0, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>

                        <img
                            src="https://github.com/felixyeboah.png"
                            alt="Felix"
                            width="48"
                            height="48"
                            style={{
                                borderRadius: '4px',
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: '12px',
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 18,
                                    color: 'white',
                                    margin: 0,
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                Felix Yeboah
                            </p>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: 'rgba(255,255,255,0.6)',
                                    margin: 0,
                                    fontFamily: 'sans-serif',
                                }}
                            >
                                @sudocode_
                            </p>
                        </div>

                        <div
                            style={{
                                marginLeft: 'auto',
                                color: 'rgba(255,255,255,0.8)',
                                fontSize: 14,
                                fontFamily: 'monospace',
                            }}
                        >
                            felixyeboahdev.vercel.app
                        </div>
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
                        zIndex: 10,
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
                        <div style={{ position: 'absolute', top: 0, left: 0, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'translate(-50%, 50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
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
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>

                            <h3 style={{ fontSize: 24, color: 'white', fontWeight: 500, fontFamily: 'sans-serif' }}>
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
                                <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                                    <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
                                    <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                                </div>
                                <p style={{ color: 'white', fontSize: 16, fontFamily: 'sans-serif' }}>About</p>
                            </div>
                            <div style={{
                                flex: 1,
                                borderRight: '1px solid #393939',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                                    <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                                </div>
                                <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
                                    <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                                </div>
                                <p style={{ color: 'white', fontSize: 16, fontFamily: 'sans-serif' }}>Cases</p>
                            </div>
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <p style={{ color: 'white', fontSize: 16, fontFamily: 'sans-serif' }}>Blog</p>
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
                                fontFamily: 'sans-serif'
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
                                fontFamily: 'sans-serif'
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
                            zIndex: 10,
                            backgroundColor: '#232323',
                        }}
                    >
                        {/* Corner + elements */}
                        <div style={{ position: 'absolute', top: 0, left: 0, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'translate(-50%, 50%)', zIndex: 10 }}>
                            <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
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
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.4, fontFamily: 'sans-serif' }}>
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
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
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
                            <div style={{ position: 'absolute', top: 0, right: 0, transform: 'translate(50%, -50%)', zIndex: 10 }}>
                                <span style={{ color: '#6B6B6B', fontSize: 18, fontFamily: 'monospace' }}>+</span>
                            </div>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'translate(50%, 50%)', zIndex: 10 }}>
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
                'cache-control': 'public, max-age=31536000, immutable',
            },
        },
    );
}
