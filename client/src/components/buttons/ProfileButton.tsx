import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../../context";

export const ProfileButton = () => {
  const { session } = useAuth();
  // const { retrieveUser } = useUser();

  const [username, setUsername] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      if (session?.user?.id) {
        // const user = await retrieveUser(session.user.id);
        // console.log(user);
        setUsername(session.user.email); // User object has a username property
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    setLoading(false);
  }, []);

  return (
    <>
      {/* {loading && (
        <>
          Loading
        </>
      )}  */}
      
      {!loading && (
        <Link to={`/profile/${username}`} className="create-project-button">
          Profile
        </Link>
      )}
    </>
  );
};
