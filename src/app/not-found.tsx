import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-5xl">That page is not in the prototype.</h1>
      <Link href="/" className="underline-offset-4 hover:underline">
        Back to today’s date
      </Link>
    </div>
  );
}
