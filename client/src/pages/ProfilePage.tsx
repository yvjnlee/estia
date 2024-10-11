import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { VisitProfile } from "../components/profile/VisitProfile";
import { User } from "../common/types";
import { Session } from "@supabase/supabase-js";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getUserByUsername } from "../api/userAPI";
import { getSession } from "../api/authAPI";
import { UserSaved } from "../components/profile/UserSaved";
import { UserCreated } from "../components/profile/UserCreated";

export const ProfilePage: React.FC = () => {
    const { username } = useParams();
    const dispatch = useAppDispatch();

    const [profile, setProfile] = useState<User | null>(null);
    const [profileLoading, setProfileLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState<boolean>(true);

    useEffect(() => {
        getSession()
            .then((session) => {
                setSession(session);
                setSessionLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching session:", error);
                setSessionLoading(false);
            });
    }, []);

    useEffect(() => {
        if (username && !sessionLoading) {
            setProfileLoading(true);
            getUserByUsername(dispatch, username)
                .then((user) => {
                    setProfile(user);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                    setProfile(null);
                })
                .finally(() => {
                    setProfileLoading(false);
                });
        }
    }, [username, sessionLoading, dispatch]);

    if (profileLoading) {
        return <div>loading...</div>;
    }

    if (!profile) {
        return (
            <div>
                <p>This account does not exist</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            {session?.user.id === profile?.id && (
                <>
                    <div className="profile-page">
                        <VisitProfile profile={profile} />
                        <UserSaved />
                        <UserCreated />
                    </div>
                </>
            )}
        </>
    );
};
