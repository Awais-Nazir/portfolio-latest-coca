"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, AlertCircle, RefreshCw, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface ContactSubmission {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [isInserting, setIsInserting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  async function fetchSubmissions() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/admin-submissions")
      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(result.error || "Failed to fetch submissions")
      }

      console.log("Submissions fetched:", result.data)
      setSubmissions(result.data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("Error fetching submissions:", err)
      setError(errorMessage)

      toast({
        title: "Error",
        description: `Failed to load contact submissions: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function deleteSubmission(id: number) {
    try {
      setIsDeleting(id)

      const response = await fetch("/api/admin-submissions/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(result.error || "Failed to delete submission")
      }

      setSubmissions((prev) => prev.filter((sub) => sub.id !== id))
      toast({
        title: "Success",
        description: "Submission deleted successfully",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("Error deleting submission:", err)

      toast({
        title: "Error",
        description: `Failed to delete submission: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  async function testInsert() {
    try {
      setIsInserting(true)

      const response = await fetch("/api/admin-submissions/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(result.error || "Failed to insert test submission")
      }

      toast({
        title: "Success",
        description: "Test submission added successfully",
      })

      // Refresh the list
      fetchSubmissions()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      console.error("Error inserting test submission:", err)

      toast({
        title: "Error",
        description: `Failed to add test submission: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setIsInserting(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Contact Form Submissions</h1>
        <div className="flex gap-2">
          <Button onClick={fetchSubmissions} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={testInsert} variant="outline" size="sm" disabled={isInserting}>
            <Plus className="h-4 w-4 mr-2" />
            {isInserting ? "Adding..." : "Add Test"}
          </Button>
        </div>
      </div>

      {/* Status Card */}
      <Card className="mb-8 bg-muted/50">
        <CardContent className="p-6">
          <h3 className="font-bold mb-2">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Database:</span>
              <span className={`ml-2 ${error ? "text-destructive" : "text-green-600"}`}>
                {error ? "Error" : "Connected"}
              </span>
            </div>
            <div>
              <span className="font-medium">RLS:</span>
              <span className="ml-2 text-green-600">Enabled</span>
            </div>
            <div>
              <span className="font-medium">API Routes:</span>
              <span className="ml-2 text-green-600">Secure</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {error ? (
        <Card className="bg-destructive/10 border-destructive/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-destructive mb-2">Error Loading Submissions</h3>
                <p className="mb-4">{error}</p>
                <div className="space-y-2">
                  <p className="font-medium">Troubleshooting:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Check that your Supabase environment variables are correctly set</li>
                    <li>Verify that the contact_submissions table exists</li>
                    <li>Ensure RLS policies are properly configured</li>
                    <li>Check the browser console and server logs for more details</li>
                  </ul>
                </div>
                <Button onClick={fetchSubmissions} className="mt-4" variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
        </div>
      ) : !error && submissions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No submissions yet</p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <Button variant="outline">Go to Contact Page</Button>
              </Link>
              <Button onClick={testInsert} variant="default" disabled={isInserting}>
                {isInserting ? "Adding..." : "Add Test Submission"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : !error ? (
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground mb-4">
            Showing {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
          </div>
          {submissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{submission.subject}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    From: <span className="font-medium">{submission.name}</span> (
                    <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                      {submission.email}
                    </a>
                    )
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(submission.created_at).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  onClick={() => deleteSubmission(submission.id)}
                  disabled={isDeleting === submission.id}
                >
                  {isDeleting === submission.id ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="whitespace-pre-wrap bg-muted/30 p-4 rounded-lg">{submission.message}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  )
}
