//src\app\layout.tsx
'use client';
import { Loader } from "@/components/ui/Loader";
import ThemeRegistry from "@/theme/Registry";
import { useUIStore } from "@/store/uiStore";
import ReactQueryProvider from "@/lib/providers/queryClientProvider"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useUIStore((state) => state.isLoading);
  const loaderMessage = useUIStore((state) => state.loaderMessage);

  return (
    <html lang="es">
      <body>
        <ThemeRegistry>
          <ReactQueryProvider>
            <Loader open={isLoading} message={loaderMessage} />
            {children}
          </ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
