import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { User, UserProps } from "../types/user";

const UserContext = createContext<UserProps | undefined>(undefined);

export const UserProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { supabase, session } = useAuth(); // Use session instead of user

    const [users, setUsers] = useState<User[] | null>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: profiles, error } = await supabase.from("profiles").select("*");
                if (error) {
                    console.log(error);
                }
                setUsers(profiles); // Set the fetched data to state
            } catch (err) {
                console.log(err);
            }
        };

        if (session?.user?.id) {
            syncUser(session.user.id); // Use session.user.id to sync user
        }
        fetchData();
    }, [session]);

    // Retrieves user information based off of id
    const retrieveUser = async (id: string) => {
        if (id) {
            try {
                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", id)
                    .single();
                if (error) {
                    syncUser(id);
                }

                return profile as User;
            } catch (err) {
                console.log(err);
                return null;
            }
        }

        return null;
    };

    // Retrieves user information based off of username
    const searchUser = async (username: string) => {
        try {
            const { data: profile, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("username", username)
                .single();

            if (error && error.code !== "PGRST116") {
                return null;
            }

            return profile as User;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    // Syncs user information from Auth table to profiles table
    const syncUser = async (id: string) => {
        console.log("Syncing User");
    
        if (session?.user) {
            const { email } = session.user;
            console.log("email:", email);
            console.log("id:", id);
            
            // Update the user's email and username if they already exist
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ email, username: email }) // Ensure you're updating with existing `id`
                .eq("id", id); // This line is critical to ensure you're targeting the correct profile
    
            if (updateError) {
                console.error("Error updating user data:", updateError);
            } else {
                console.log("User data updated successfully");
            }
        }
    };

    const value = {
        users: users as User[],
        searchUser: searchUser,
        retrieveUser: retrieveUser,
        syncUser: syncUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
