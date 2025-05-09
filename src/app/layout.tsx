import type { Metadata } from 'next';
import { GlobalStyles } from '@/components/GlobalStyles';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'Financial dashboard for tracking income and expenses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
