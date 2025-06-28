import Link from 'next/link';
export default function Custom404() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-slate-700 dark:text-slate-300">404</h1>
      <p className="text-xl mt-4 mb-8 text-slate-500">Oops! This page could not be found.</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600"
      >
        Go back home
      </Link>
    </div>
  );
}