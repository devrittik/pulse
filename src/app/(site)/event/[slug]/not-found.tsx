import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center text-center">
      <div>
        <p className="font-display text-8xl font-black text-accent">404</p>
        <h1 className="mt-4 text-3xl font-black">Event off air</h1>
        <p className="mt-2 text-muted">This event could not be found.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-bold text-white"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
