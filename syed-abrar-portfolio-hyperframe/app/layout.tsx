import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Syed Abrar — AI & Data Science Portfolio',
  description:
    'Personal portfolio of Syed Abrar, an AI & Data Science student and aspiring Data Analyst. Explore projects, skills, and more.',
  keywords: ['Syed Abrar', 'AI', 'Data Science', 'Machine Learning', 'Data Analyst', 'Portfolio'],
  authors: [{ name: 'Syed Abrar' }],
  openGraph: {
    title: 'Syed Abrar — AI & Data Science Portfolio',
    description: 'AI & Data Science student | Aspiring Data Analyst',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#020408] text-[#f0f4ff] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
