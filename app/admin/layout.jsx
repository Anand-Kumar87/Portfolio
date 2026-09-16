import { Providers } from '@/components/Providers';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}