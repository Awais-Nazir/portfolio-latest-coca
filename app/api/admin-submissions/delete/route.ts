import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id || typeof id !== "number") {
      return NextResponse.json({ error: "Invalid ID provided" }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from("contact_submissions").delete().eq("id", id)

    if (error) {
      console.error("Supabase delete error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Submission deleted successfully" })
  } catch (error) {
    console.error("API delete error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
