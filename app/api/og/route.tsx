import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const runtime = 'edge';
// Set a longer timeout
export const maxDuration = 20; // 20 seconds

// Font loading is currently not working with local font files
// Using a web-safe font instead for now
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const title = searchParams.get('title');
        const debug = searchParams.get('debug');

        // Debug mode returns simple text image
        if (debug === 'true') {
            return generateSimpleOGImage(title || 'Debug Mode');
        }

        // If no title is provided, generate the default OG image
        if (!title) {
            return generateDefaultOGImage();
        }

        const cover = searchParams.get('cover');
        const date = searchParams.get('date');
        const subtitle = searchParams.get('subtitle');
        const readingTime = searchParams.get('readingTime');

        // Generate blog post OG image
        return generateBlogOGImage({ title, subtitle, date, readingTime, cover });
    } catch (error) {
        console.error('OG Image generation error:', error);
        // Return a simple error image instead of failing
        try {
            return generateSimpleOGImage('Error generating image');
        } catch (fallbackError) {
            // If even the simple image fails, return a text response
            return new Response('Error generating OG image', { status: 500 });
        }
    }
}

// Simple default text-only image for testing
function generateSimpleOGImage(text: string = 'Felix Yeboah') {
    try {
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundImage: 'linear-gradient(to bottom right, #232323, #121212)',
                        fontSize: 60,
                        fontWeight: 'bold',
                        color: 'white',
                        padding: 32,
                    }}
                >
                    <div style={{ textAlign: 'center' }}>{text}</div>
                </div>
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
    } catch (error) {
        console.error('Failed to generate simple OG image:', error);
        return new Response('Error generating simple OG image', { status: 500 });
    }
}

// Function to safely generate blog OG image with fallbacks for cover image
function generateBlogOGImage({
    title,
    subtitle,
    date,
    readingTime,
    cover
}: {
    title: string;
    subtitle?: string | null;
    date?: string | null;
    readingTime?: string | null;
    cover?: string | null;
}) {
    // Define the grid structure - simpler but still with the borders and plus icons
    try {
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

                            {/* Felix Logo */}
                            <div style={{
                                width: '220px',
                                borderRight: '1px solid #333',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 24,
                                fontWeight: 500,
                            }}>
                                Felix
                            </div>
                        </div>

                        {/* Main content area */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            position: 'relative',
                        }}>
                            {/* Title and content on the left */}
                            <div style={{
                                flex: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: '0 40px',
                            }}>
                                <h1 style={{
                                    fontSize: 48,
                                    fontWeight: 700,
                                    margin: 0,
                                    marginBottom: subtitle ? 20 : 0,
                                    color: 'white',
                                    lineHeight: 1.2,
                                }}>
                                    {title}
                                </h1>
                                {subtitle && (
                                    <p style={{
                                        fontSize: 24,
                                        color: '#CCC',
                                        margin: 0,
                                        marginBottom: 30,
                                        lineHeight: 1.4,
                                    }}>
                                        {subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Image on the right - use a color placeholder if cover image isn't available */}
                            <div style={{
                                flex: 1,
                                borderLeft: '1px solid #333',
                                overflow: 'hidden',
                                position: 'relative',
                                backgroundColor: '#111',
                            }}>
                                {cover ? (
                                    <img
                                        src={cover}
                                        alt={title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                        onError={() => {
                                            console.log('Image failed to load');
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#222',
                                        color: '#444',
                                        fontSize: 64,
                                    }}>F</div>
                                )}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.4)',
                                }} />
                            </div>
                        </div>

                        {/* Footer with metadata */}
                        <div style={{
                            borderTop: '1px solid #333',
                            height: '80px',
                            display: 'flex',
                            position: 'relative',
                        }}>
                            {/* Plus icons at the corners of the footer */}
                            <div style={{ position: 'absolute', top: -5, left: -5, color: '#666', fontSize: 18 }}>+</div>
                            <div style={{ position: 'absolute', top: -5, right: -5, color: '#666', fontSize: 18 }}>+</div>
                            <div style={{ position: 'absolute', bottom: -5, left: -5, color: '#666', fontSize: 18 }}>+</div>
                            <div style={{ position: 'absolute', bottom: -5, right: -5, color: '#666', fontSize: 18 }}>+</div>

                            {/* Tagline */}
                            <div style={{
                                width: '300px',
                                borderRight: '1px solid #333',
                                padding: '0 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                fontSize: 14,
                                color: '#AAA',
                            }}>
                                Designing for a<br />connected world.
                            </div>

                            {/* Date */}
                            {date && (
                                <div style={{
                                    flex: 1,
                                    borderRight: '1px solid #333',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <div style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>Published</div>
                                    <div style={{ fontSize: 16, color: 'white' }}>{date}</div>
                                </div>
                            )}

                            {/* Reading time */}
                            {readingTime && (
                                <div style={{
                                    flex: 1,
                                    borderRight: '1px solid #333',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <div style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>Reading Time</div>
                                    <div style={{ fontSize: 16, color: 'white' }}>{readingTime}</div>
                                </div>
                            )}

                            {/* Author */}
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <div style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>Author</div>
                                <div style={{ fontSize: 16, color: 'white' }}>Felix Yeboah</div>
                            </div>
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
            }
        );
    } catch (error) {
        console.error('Failed to generate blog OG image:', error);
        // Fallback to simple OG image
        return generateSimpleOGImage(title);
    }
}

function generateDefaultOGImage() {
    // Define a simpler but still branded default OG image
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

                        {/* Felix Logo */}
                        <div style={{
                            width: '220px',
                            borderRight: '1px solid #333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                            fontWeight: 500,
                        }}>
                            Felix
                        </div>
                    </div>

                    {/* Main content area */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0 40px',
                    }}>
                        <h1 style={{
                            fontSize: 72,
                            fontWeight: 700,
                            margin: 0,
                            marginBottom: 20,
                            color: 'white',
                            textAlign: 'center',
                        }}>
                            Felix Yeboah
                        </h1>
                        <p style={{
                            fontSize: 24,
                            color: '#CCC',
                            margin: 0,
                            textAlign: 'center',
                        }}>
                            Software Engineer & Designer
                        </p>
                    </div>

                    {/* Footer with metadata */}
                    <div style={{
                        borderTop: '1px solid #333',
                        height: '80px',
                        display: 'flex',
                        position: 'relative',
                    }}>
                        {/* Plus icons at the corners of the footer */}
                        <div style={{ position: 'absolute', top: -5, left: -5, color: '#666', fontSize: 18 }}>+</div>
                        <div style={{ position: 'absolute', top: -5, right: -5, color: '#666', fontSize: 18 }}>+</div>
                        <div style={{ position: 'absolute', bottom: -5, left: -5, color: '#666', fontSize: 18 }}>+</div>
                        <div style={{ position: 'absolute', bottom: -5, right: -5, color: '#666', fontSize: 18 }}>+</div>

                        {/* Tagline */}
                        <div style={{
                            width: '300px',
                            borderRight: '1px solid #333',
                            padding: '0 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            fontSize: 14,
                            color: '#AAA',
                        }}>
                            Designing for a<br />connected world.
                        </div>

                        {/* Portfolio */}
                        <div style={{
                            flex: 1,
                            borderRight: '1px solid #333',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>Portfolio</div>
                            <div style={{ fontSize: 16, color: 'white' }}>2024</div>
                        </div>

                        {/* Based in */}
                        <div style={{
                            flex: 1,
                            borderRight: '1px solid #333',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>Based in</div>
                            <div style={{ fontSize: 16, color: 'white' }}>Accra, Ghana</div>
                        </div>

                        {/* Contact */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>Contact</div>
                            <div style={{ fontSize: 16, color: 'white' }}>@sudocode_</div>
                        </div>
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
        }
    );
}
