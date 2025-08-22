import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-secondary">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Left side: project info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>© {new Date().getFullYear()} WROK v0.0</span>
          <span className="hidden sm:block">·</span>
          <Link
            href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL || ""}
            target="_blank"
            className="hover:text-secondary-foreground/60 transition"
          >
            GitHub
          </Link>
          <Link
            href="/docs"
            target="_blank"
            className="hover:text-secondary-foreground/60 transition"
          >
            Documentation
          </Link>
        </div>

        {/* Right side: license & community */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Link
            href={process.env.NEXT_PUBLIC_GITHUB_MIT_LICENSE || ""}
            target="_blank"
            className="hover:text-secondary-foreground/60 transition"
          >
            MIT License
          </Link>
          {/* <span className="hidden sm:block">·</span>
          <a
            href="https://discord.gg/your-invite"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-foreground/60 transition"
          >
            Join Community
          </a> */}
        </div>
      </div>
    </footer>
  );
}
