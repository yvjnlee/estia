import { Session, SupabaseClient } from "@supabase/supabase-js";
import { User } from "./user";

export interface AuthProps {
    session: Session | null;
    supabase: SupabaseClient
    showAuth: boolean;
    user: User | null;
    logIn: () => void;
    logOut: () => void;
}
  