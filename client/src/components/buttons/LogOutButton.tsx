import React from "react";
import { supabase } from "../../common/clients";

export const LogOutButton = () => {
    const handleLogOut = () => {
        supabase.auth.signOut();
    };

    return (
        <>
            <button className="log-out-button" onClick={handleLogOut}>
                Log Out
            </button>
        </>
    );
};
