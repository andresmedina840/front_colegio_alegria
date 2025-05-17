//src/app/layout.tsx
"use client";
import { Loader } from "@/components/ui/Loader";
import ThemeRegistry from "@/theme/Registry";
import { useUIStore } from "@/store/uiStore";
import ReactQueryProvider from "@/lib/providers/queryClientProvider";
import { Toaster } from "sonner";

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
            <Toaster richColors closeButton position="top-right" />{" "}
          </ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
