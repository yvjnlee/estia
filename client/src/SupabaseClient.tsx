/* eslint-disable no-undef */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.REACT_APP_PROJECT_URL as string,
    process.env.REACT_APP_ANON_KEY as string
);

export default supabase;
