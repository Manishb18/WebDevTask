import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className=" text-white p-4">
        <h1 className="text-xl lg:text-3xl font-bold">Blogger Admin</h1>
      </header>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}