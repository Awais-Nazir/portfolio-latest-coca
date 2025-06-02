import { NextResponse } from "next/server"
import { createClient } from "contentful"

export async function GET() {
  try {
    // Check if environment variables are set
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: "Contentful environment variables are not set",
          environmentVariables: {
            spaceId: process.env.CONTENTFUL_SPACE_ID ? "Set" : "Not set",
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ? "Set" : "Not set",
          },
        },
        { status: 500 },
      )
    }

    // Create Contentful client
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })

    // Fetch entries
    const entries = await client.getEntries({
      content_type: "project",
    })

    // Return the response
    return NextResponse.json({
      success: true,
      data: entries,
      total: entries.total,
      environmentVariables: {
        spaceId: "Set",
        accessToken: "Set",
      },
    })
  } catch (error) {
    console.error("Contentful API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        environmentVariables: {
          spaceId: process.env.CONTENTFUL_SPACE_ID ? "Set" : "Not set",
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ? "Set" : "Not set",
        },
      },
      { status: 500 },
    )
  }
}
