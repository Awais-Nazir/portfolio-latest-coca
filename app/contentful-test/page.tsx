"use client"

import { useState, useEffect } from "react"
import { contentfulClient } from "@/lib/contentful"

export default function ContentfulTestPage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [envVars, setEnvVars] = useState({
    publicSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ? "✅ Set" : "❌ Not set",
    publicAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ? "✅ Set" : "❌ Not set",
  })

  useEffect(() => {
    async function testContentful() {
      try {
        setLoading(true)

        // Test the raw Contentful client
        console.log("Testing Contentful connection...")
        const rawResponse = await contentfulClient.getEntries({
          content_type: "project",
          limit: 1,
        })

        console.log("Raw Contentful response:", rawResponse)
        setData(rawResponse)
      } catch (err) {
        console.error("Contentful error:", err)
        setError(err instanceof Error ? err.message : "Unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    testContentful()
  }, [])

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Contentful Connection Test</h1>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        <p>NEXT_PUBLIC_CONTENTFUL_SPACE_ID: {envVars.publicSpaceId}</p>
        <p>NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: {envVars.publicAccessToken}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="h-8 w-8 rounded-full border-t-2 border-b-2 border-python-blue animate-spin"></div>
          <span className="ml-3">Testing Contentful connection...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>

          <div className="mt-4 p-4 bg-background rounded-lg">
            <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Check that your environment variables are correctly set in your Vercel project</li>
              <li>Make sure you've redeployed your site after adding environment variables</li>
              <li>Verify that your Contentful Space ID and Access Token are correct</li>
              <li>Check that your Contentful space has content with the correct content model</li>
            </ol>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Connection Successful</h2>
          <p className="mb-4">Found {data?.total} projects in Contentful.</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Raw Response Data:</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
