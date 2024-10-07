import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useUser } from "../context";
import { User } from "../types/user";
import { Navbar } from "../components/navbar/Navbar";

import { VisitProfile } from "../components/profile/VisitProfile";
import { UserProfile } from "../components/profile/UserProfile";
import { UserProjects } from "../components/profile/UserProjects";
import { UserSavedProjects } from "../components/profile/UserSaved";

export const ProfilePage: React.FC = () => {
  const { username } = useParams();
  const { searchUser } = useUser();
  const { session } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<User | null>();

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
  }, [username]);

  return (
    <>
      <Navbar />

      {profile && session?.user.id !== profile?.id && (
        <>
          <UserProfile profile={profile} />
          <UserProjects />
          

        </>
      )}

      {session?.user.id === profile?.id && profile && (
        <>
          <VisitProfile profile={profile} />
          <UserSavedProjects/>
          <UserProjects />


        </>
      )}

      {loading && (
        <>
          <div>loading...</div>
        </>
      )}

      {!profile && !loading && (
        <>
          <div>
            <p>This account does not exist</p>
          </div>
        </>
      )}
    </>
  );
};
