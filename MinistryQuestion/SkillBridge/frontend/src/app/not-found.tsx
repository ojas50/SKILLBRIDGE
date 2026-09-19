import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFC400] to-[#FF6D00] mb-4">
        404
      </p>
      <h1 className="text-2xl font-bold text-white mb-2">
        Page not found
      </h1>
      <p className="text-sm text-slate-400 max-w-md mx-auto mb-8">
        This link leads to a page that does not exist or has moved. Head back
        home to find your way.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6D00] text-[#141414] text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </section>
  );
}