import React, { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { getSession } from "../../api/authAPI";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export const Layout: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const { isUserLoaded } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
        });
    }, [isUserLoaded]);

    console.log(isUserLoaded);

    return (
        <div>
            {session && <Navbar />}
            <Outlet />
        </div>
    );
};