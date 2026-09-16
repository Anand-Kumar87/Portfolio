import { Providers } from '@/components/Providers';
import '../globals.css';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}