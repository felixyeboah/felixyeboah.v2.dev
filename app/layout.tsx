import { ClientLayout } from '@/core/components/client-layout';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import localFont from 'next/font/local';

import './animated-button.css';
import './globals.css';
import './locomotive.css';

const aperkuSans = localFont({
    src: [
        {
            path: './fonts/ApercuProBlack.otf',
            weight: '900',
            style: 'normal',
        },
        {
            path: './fonts/ApercuProBold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/ApercuProExtraLight.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: './fonts/ApercuProLight.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/ApercuProMedium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/ApercuProRegular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/ApercuProThin.otf',
            weight: '100',
            style: 'normal',
        },
    ],
    variable: '--font-aperku-sans',
});

const aperkuSansMono = localFont({
    src: [
        {
            path: './fonts/ApercuMonoProBold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/ApercuMonoProLight.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/ApercuMonoProMedium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/ApercuMonoProRegular.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-aperku-sans-mono',
});

const voyageBold = localFont({
    src: [
        {
            path: './fonts/Voyage-Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-voyage',
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [
        {
            name: siteConfig.author,
            url: siteConfig.url,
        },
    ],
    creator: siteConfig.author,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    openGraph: {
        type: 'website',
        locale: siteConfig.siteLanguage,
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: siteConfig.twitterCardType,
        title: siteConfig.title,
        description: siteConfig.description,
        site: siteConfig.twitter,
        creator: siteConfig.twitter,
        images: [siteConfig.ogImage],
    },
    icons: {
        icon: siteConfig.favicon,
        shortcut: siteConfig.favicon,
        apple: siteConfig.favicon,
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html
                lang="en"
                className={`${aperkuSans.variable} ${aperkuSansMono.variable} ${voyageBold.variable}`}
            >
                <body
                    className={`${aperkuSans.variable} ${aperkuSansMono.variable} ${voyageBold.variable} antialiased`}
                >
                    <ClientLayout>{children}</ClientLayout>
                </body>
            </html>
        </ViewTransitions>
    );
}
