import { Session, SupabaseClient } from "@supabase/supabase-js";
import { User } from "./user";

export interface AuthProps {
  session: Session | null;
  supabase: SupabaseClient;
  showAuth: boolean;
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
}
