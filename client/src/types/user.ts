export interface ProfileProps {
  profile: User | null;
}

export interface UserProps {
  users: User[] | null;
  retrieveUser: (id: string) => Promise<User | null>;
  searchUser: (username: string) => Promise<User | null>;
  syncUser: (id: string) => void;
}

export interface User {
  id: string;
  email?: string | undefined;
  username?: string;
}
