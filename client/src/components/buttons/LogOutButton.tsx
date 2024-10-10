import React from "react";
import { logOut } from "../../api/authAPI";

export const LogOutButton = () => {
    return (
        <>
            <button className="log-out-button" onClick={logOut}>
                Log Out
            </button>
        </>
    );
};
