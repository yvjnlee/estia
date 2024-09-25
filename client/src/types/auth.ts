import { Session, SupabaseClient, User } from "@supabase/supabase-js";

export interface AuthProps {
    session: Session | null;
    supabase: SupabaseClient
    showAuth: boolean;
    user: User | null;
    logIn: () => void;
    logOut: () => void;
}
  