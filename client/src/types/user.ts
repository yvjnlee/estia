import { UUID } from "crypto";

export interface UserProps {
  users: User[] | null;
  retrieveUser: (id: UUID) => Promise<User | null>;
  searchUser: (username: string) => Promise<User | null>;
}

export interface User {
  id: UUID;
  email: string;
  username?: string;
}
