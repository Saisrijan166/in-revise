import Link from "next/link";
import { urls } from "@/lib/urls";
import { LogoMark } from "@/components/site/Logo";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <LogoMark size={64} />
      <h1 className="mt-6 text-3xl font-extrabold">This page is not on the map</h1>
      <p className="mt-2 text-ink-2">The page may have moved, or the link has a typo.</p>
      <Link
        href={urls.home()}
        className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-accent px-5 font-bold text-on-accent"
      >
        Back to home
      </Link>
    </div>
  );
}
