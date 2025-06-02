import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
