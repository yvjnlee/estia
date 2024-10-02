import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useAuth, useUser } from "../../context";
import { UUID } from "crypto";

export const ProfileButton = () => {
  const { session } = useAuth();
  const { retrieveUser } = useUser();

  const [username, setUsername] = useState<string>();

  const fetchUser = async () => {
    try {
      const userData = await retrieveUser(session?.user.id as UUID);
      setUsername(userData?.username);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session]);

  return (
    <Link to={`/profile/${username}`} className="create-project-button">
      Profile
    </Link>
  );
};
