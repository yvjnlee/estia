import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { getSession } from "../../api/authAPI";
import { getUserById } from "../../api/userAPI";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const ProfileButton = () => {
    const dispatch = useAppDispatch();

    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
            setSessionLoading(false);
        });
    }, []);

    useEffect(() => {
        if (session) {
            getUserById(dispatch, session.user.id).then((user) => {
                setUsername(user.username as string);
                setUserLoading(false);
            });
        }
    }, [session, dispatch]);

    console.log(username, session);

    return (
        <>
            {sessionLoading && userLoading && <>Loading</>}

            {!sessionLoading && !userLoading && (
                <Link to={`/profile/${username}`} className="create-project-button">
                    Profile
                </Link>
            )}
        </>
    );
};
