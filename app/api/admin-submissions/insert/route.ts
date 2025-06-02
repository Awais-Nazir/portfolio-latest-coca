import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST() {
  try {
    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert([
        {
          name: "Test Admin",
          email: "admin@example.com",
          subject: "Admin Insert Test",
          message: "Inserted via secure API route",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Insert successful", data })
  } catch (error) {
    console.error("API insert error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
