import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { fetchUserById } from "../../../store/slices/userSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { User } from "../../../common/types";

export const ProfileSearch: React.FC = () => {
    const dispatch = useAppDispatch();

    const [userResults, setUserResults] = useState<User[] | User>([]);
    const [searchQuery, setSearchQuery] = useState<string>();

    // Handle search when button is clicked
    const handleSearch = async (id: string) => {
        dispatch(fetchUserById(id))
            .unwrap()
            .then((user) => {
                setUserResults(user);
                console.log(userResults);
            })
            .catch((error) => {
                console.error("Error fetching user by ID:", error);
            });
    };

    // Handle search when Enter key is pressed
    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
        if (e.key === "Enter") {
            handleSearch(id);
        }
    };

    // Handle key presses
    const handleKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <SearchBar
            searchQuery={searchQuery as string}
            handleEnter={handleEnter}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
        />
    );
};
