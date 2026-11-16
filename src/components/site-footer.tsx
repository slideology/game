import Link from "next/link";
import { brand } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-3 px-4 py-6 text-sm leading-6 text-muted-foreground sm:px-6">
        <p>{brand.disclaimer}</p>
        <p>
          No accounts, ads, or analytics. Progress stays in this browser. The set changes at 00:00 UTC.{" "}
          <Link href="/about" className="underline-offset-4 hover:underline">
            Sources, licenses, and limits
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
