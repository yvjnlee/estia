import React, { useEffect, useState } from "react";
import EstiaLogo from "../../img/AppLogo.svg";

import { LogOutButton } from "../buttons/LogOutButton";
import { Link } from "react-router-dom";
import { useAuth, useUser } from "../../context";
import { UUID } from "crypto";

export const Navbar: React.FC = () => {
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
    <div className="nav-bar" data-scroll-section>
      <Link to="/">
        <img className="logo" src={EstiaLogo}></img>
      </Link>

      <Link to={`/profile/${username}`}>profile</Link>

      <LogOutButton />
    </div>
  );
};
