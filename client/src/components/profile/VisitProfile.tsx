import React from "react";
import { ProfileProps } from "../../types";

export const VisitProfile: React.FC<ProfileProps> = ({ profile }) => {
    return (
        <>
            <div className="">
                <h2 className="profile-title">Welcome back, {profile?.username}!</h2>
            </div>
        </>
    );
};
