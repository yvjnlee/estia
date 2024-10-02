import React, { useState } from "react";
import { useUser } from "../../../context";
import { UUID } from "crypto";
import { User } from "../../../types/user";
import { SearchBar } from "../SearchBar";

export const ProfileSearch: React.FC = () => {
  const { users, retrieveUser } = useUser();

  const [userResults, setUserResults] = useState<User[] | User>(
    users as User[],
  );
  const [searchQuery, setSearchQuery] = useState<string>();

  // console.log(users);
  console.log(userResults);

  // Handle search when button is clicked
  const handleSearch = async (id: UUID) => {
    const user = await retrieveUser(id);
    setUserResults(user as User);
    console.log(userResults);
  };

  // Handle search when Enter key is pressed
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, id: UUID) => {
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
