import React from "react";
import { ProfileProps } from "../../types/user";

export const VisitProfile: React.FC<ProfileProps> = ({ profile }) => {
    return (
        <>
            <div className="">
                <h2 className="">Welcome back, {profile?.username}!</h2>
                <p>ID: {profile?.id}</p>
                <p>Email: {profile?.email}</p>
            </div>
        </>
    );
};
