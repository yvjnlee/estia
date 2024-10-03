import React from "react";
import { ProfileProps } from "../../types/user";

export const UserProfile: React.FC<ProfileProps> = ({ profile }) => {
    return(
        <>
          <div>
            <p>Welcome to {profile?.username}`s profile</p>
          </div>
        </>
    );
}