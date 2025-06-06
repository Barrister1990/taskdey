import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-indigo-600">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Oops! It seems like you&apos;ve wandered into uncharted territory. Let&apos;s get
          you back to safety.
        </p>
        <Button asChild>
          <Link href="/">Return to Safety (Home)</Link>
        </Button>
      </div>
    </div>
  );
}