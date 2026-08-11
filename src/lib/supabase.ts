import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitInquiry(data: {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}) {
  const { error } = await supabase.from("inquiries").insert({
    name: data.name,
    email: data.email,
    phone: data.phone,
    project_type: data.projectType,
    message: data.message,
    status: "new",
  });

  if (error) {
    throw new Error(error.message);
  }
}
