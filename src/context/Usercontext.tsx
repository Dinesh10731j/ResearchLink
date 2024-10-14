import { createContext, useState, ReactNode } from 'react';

interface UserContextType {
  user:any;
  setUser: React.Dispatch<React.SetStateAction<unknown>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
