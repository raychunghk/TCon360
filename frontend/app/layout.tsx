import { config } from '@tcon360/config';
import ClientLayout from './ClientLayout';

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout
      config={{
        basepath: config.basepath,
        prefix: config.prefix,
        useReverseProxy: config.useReverseProxy,
      }}
    >
      {children}
    </ClientLayout>
  );
}