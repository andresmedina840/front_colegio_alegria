// src/app/(dashboard)/layout.tsx
import TemplateColegio from "@/components/personalizados/template/TemplateColegio";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TemplateColegio>{children}</TemplateColegio>;
}
