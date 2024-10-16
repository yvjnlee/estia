import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { getSession } from "../../api/authAPI";

export const Layout: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
        });
    }, []);

    return (
        <div>
            {session && <Navbar />}
            <Outlet />
        </div>
    );
};