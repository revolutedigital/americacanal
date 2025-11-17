// Server Component - redirects to dashboard
import { redirect } from 'next/navigation';

export default function ContaPage() {
  // Redirect to dashboard when accessing /conta
  redirect('/conta/dashboard');
}