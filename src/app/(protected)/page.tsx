import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Index() {
  const cookieStore = await cookies();
  const allowedPagesCookie = cookieStore.get(process.env.NEXT_PUBLIC_ALLOWED_PAGES_COOKIE!)?.value;

  const allowedPages: string[] = allowedPagesCookie ? JSON.parse(allowedPagesCookie) : [];

  return redirect(allowedPages.length > 0 ? allowedPages[0] : '/');
}
