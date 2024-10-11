import { supabase } from "../common/clients";

export const getSession = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    return sessionData.session;
};

export const logOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
};
