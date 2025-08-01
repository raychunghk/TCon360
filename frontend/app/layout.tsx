// app/layout.tsx (or wherever your root layout is located)
import { config } from '@tcon360/config';
import ClientLayout from './ClientLayout'; // Your client component wrapper

// Import global styles here. These will be loaded once for the entire application.
import '@/styles/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Derive faviconUrl here, as it's part of the static head content
  const faviconUrl = `${config.prefix}/favicon.svg`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head >

        <ColorSchemeScript defaultColorScheme="auto" />


        <link rel="shortcut icon" href={faviconUrl} />


        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {/* Any other global meta tags or links can go here */}
      </head>
      <body>
        {/*
          ClientLayout is now a wrapper for client-side logic and providers.
          It receives the 'config' prop from the server component.
        */}
        <ClientLayout
          config={{
            basepath: config.basepath,
            prefix: config.prefix,
            useReverseProxy: config.useReverseProxy,
          }}
        >
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}