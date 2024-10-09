import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { VisitProfile } from "../components/profile/VisitProfile";
import { UserProfile } from "../components/profile/UserProfile";
import { UserProjects } from "../components/profile/UserProjects";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchUserByUsername } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../common/clients";
import { User } from "../common/types";

export const ProfilePage: React.FC = () => {
    const { username } = useParams();
    const dispatch = useAppDispatch();
    const { users, usersLoading } = useSelector((state: RootState) => state.users);
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        setSessionLoading(false);
    }, []);

    useEffect(() => {
        dispatch(fetchUserByUsername(username as string));
    }, [username]);

    const profile: User | null = users?.find((user) => user.username === username) ?? null;

    return (
        <>
            <Navbar />

            {users && session?.user.id !== profile?.id && (
                <>
                    <UserProfile profile={profile} />

                    <UserProjects />
                </>
            )}

            {session?.user.id === profile?.id && profile && (
                <>
                    <VisitProfile profile={profile} />

                    <UserProjects />
                </>
            )}

            {usersLoading && sessionLoading && (
                <>
                    <div>loading...</div>
                </>
            )}

            {!users && !usersLoading && !sessionLoading && (
                <>
                    <div>
                        <p>This account does not exist</p>
                    </div>
                </>
            )}
        </>
    );
};
