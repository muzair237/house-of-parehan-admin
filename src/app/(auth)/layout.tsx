export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl shadow-2xl border border-[var(--border)] bg-[var(--card)] p-10 md:p-12 space-y-10">
        {children}
      </div>
    </main>
  );
}
