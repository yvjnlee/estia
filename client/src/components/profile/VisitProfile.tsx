import React from "react";
import { ProfileProps } from "../../types";

export const VisitProfile: React.FC<ProfileProps> = ({ profile }) => {
    return (
        <>
            <div>
                <p>Welcome back, {profile?.username}</p>
                <p>Your id is: {profile?.id}</p>
                <p>Your email is: {profile?.email}</p>
            </div>
        </>
    );
};
