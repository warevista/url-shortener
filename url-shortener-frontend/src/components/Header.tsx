import Link from 'next/link';
export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-800/50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-sky-500 hover:text-sky-600">
              Home
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/list" className="text-base font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              URL List
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}