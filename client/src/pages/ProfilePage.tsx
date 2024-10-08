import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useUser } from "../context";
import { User } from "../types/user";
import { Navbar } from "../components/navbar/Navbar";

import { VisitProfile } from "../components/profile/VisitProfile";
import { UserCreated } from "../components/profile/UserCreated";
import { UserSaved } from "../components/profile/UserSaved";

export const ProfilePage: React.FC = () => {
    const { username } = useParams();
    const { searchUser } = useUser();
    const { session } = useAuth();

    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const userData = await searchUser(username as string);
            setProfile(userData as User);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
        console.log("profile: ", username)
    }, [username]);

    if (loading) {
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
