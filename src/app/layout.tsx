import type { Metadata } from 'next';
import './globals.css';
import { AppContextProvider } from '@/context/app-context';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'NoiseFit Intelligence - Smart Health Insights',
  description: 'A health data intelligence platform by NoiseFit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="https://cdn.brandfetch.io/idZViZh4Xg/w/32/h/32/theme/dark/logo.png" type="image/png" />
      </head>
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning>
        <AppContextProvider>
          {children}
          <Toaster />
        </AppContextProvider>
      </body>
    </html>
  );
}
