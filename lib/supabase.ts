import { createClient } from "@supabase/supabase-js"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Log environment variable status (without revealing actual values)
if (typeof window === "undefined") {
  // Only log on server side
  console.log("Supabase environment variables status:", {
    url: supabaseUrl ? "Set" : "Missing",
    anonKey: supabaseAnonKey ? "Set" : "Missing",
    serviceRoleKey: supabaseServiceRoleKey ? "Set" : "Missing",
  })
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      persistSession: false,
    },
  },
)

// Create a service role client for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseServiceRoleKey || "placeholder-service-key",
  {
    auth: {
      persistSession: false,
    },
  },
)

// Export a function to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseServiceRoleKey)
}

// Helper function to safely insert data into Supabase
export async function safeSupabaseInsert(table: string, data: any) {
  if (!isSupabaseConfigured()) {
    console.log(`Supabase not configured. Would have inserted into ${table}:`, data)
    return { success: false, error: "Supabase not configured" }
  }

  try {
    const { data: result, error } = await supabaseAdmin.from(table).insert([data]).select()

    if (error) {
      console.error(`Error inserting into ${table}:`, error)
      return { success: false, error }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error(`Exception inserting into ${table}:`, error)
    return { success: false, error }
  }
}
