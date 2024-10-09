import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchUserById } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../common/clients";

export const ProfileButton = () => {
    const dispatch = useAppDispatch();
    const { users, usersLoading } = useSelector((state: RootState) => state.users);
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);
            setSessionLoading(false);
        };

        fetchSession();
    }, []);

    useEffect(() => {
        if (session?.user.id) {
            dispatch(fetchUserById(session.user.id));
        }
    }, [dispatch, session]);

    const currentUser = users?.find((user) => user.id === session?.user.id);
    const username = currentUser?.username;

    return (
        <>
            {sessionLoading && usersLoading && <>Loading</>}

            {!sessionLoading && !usersLoading && (
                <Link to={`/profile/${username}`} className="create-project-button">
                    Profile
                </Link>
            )}
        </>
    );
};
