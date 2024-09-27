import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { User, UserProps } from "../types/user";
import { UUID } from "crypto";

const UserContext = createContext<UserProps | undefined>(undefined);

export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { supabase } = useAuth();

  const [users, setUsers] = useState<User[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select("*");
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
    fetchData();
  }, []);

  // Retrieves user information based off of id
  const retreiveUser = async (id: UUID) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.log(error);
      }

      return profile as User;

    } catch (err) {
      console.log(err);
      return null
    }
  };

  // Retrieves user information based off of id
  const searchUser = async (username: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();
      if (error) {
        console.log(error);
      }

      return profile as User;

    } catch (err) {
      console.log(err);
      return null
    }
  };

  const value = {
    users: users as User[],
    searchUser: searchUser,
    retrieveUser: retreiveUser,
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
