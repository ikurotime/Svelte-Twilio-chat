// @ts-nocheck
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


export async function signInWith(provider) {
  try {
    const { error } = await supabase.auth.signIn({provider});
    if (error) { console.log(error) }
  } catch (error) {
    console.log(error)
  }
}

export async function singOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) { console.log(error) }
  } catch (error) {
    console.log(error)
  }
}