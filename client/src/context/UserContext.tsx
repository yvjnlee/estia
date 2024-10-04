import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { User, UserProps } from "../types/user";

const UserContext = createContext<UserProps | undefined>(undefined);

export const UserProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { supabase, user } = useAuth();

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
            } finally {
                // console.log("got data")
            }
        };

        if (user) {
            syncUser(user.id);
        }
        fetchData();
    }, []);

    // Retrieves user information based off of id
    const retreiveUser = async (id: string) => {
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

    // Retrieves user information based off of id
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

    // Syncs user information from Auth table to public table
    const syncUser = async (id: string) => {
        console.log("Syncing User");

        if (user) {
            const { email } = user;
            const userInfo: User = { id, email };

            // temporary for now while we dont have usernames
            userInfo.username = email;

            try {
                // Check if the user exists in the target table
                const { data: targetData, error: targetError } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (targetError) {
                    console.error("Error checking target data:", targetError);
                }

                if (!targetData) {
                    const { error: insertError } = await supabase
                        .from("profiles")
                        .insert([{ ...userInfo }]);

                    if (insertError) {
                        console.error("Error inserting user data:", insertError);
                    } else {
                        console.log("User data inserted successfully.");
                    }
                } else {
                    const { error } = await supabase
                        .from("profiles")
                        .update({ ...userInfo })
                        .eq("id", id)
                        .select("id");
                    if (error) {
                        console.log(error);
                    }
                    console.log("User data updated successfully");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const value = {
        users: users as User[],
        searchUser: searchUser,
        retrieveUser: retreiveUser,
        syncUser: syncUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useProject must be used within an UserProvider");
    }
    return context;
};
