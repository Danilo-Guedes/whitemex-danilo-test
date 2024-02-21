import { User } from "@/types/user";
import { createContext, useEffect, useState } from "react";

// Create the UserContext
const UserContext = createContext<{
  user?: User;
  setUserFn: (user: User) => void;
}>({
  user: undefined,
  setUserFn: () => { throw new Error('setUserFn was called without a UserContext.Provider'); },
});

// Create a UserProvider component to wrap your app and provide the user data
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  function setUserFn(user: User) {
    setUser(user);
  }

  useEffect(() => {
    const retrievedUser = JSON.parse(
      localStorage.getItem("user-data") || "{}"
    ) as User;

    if (retrievedUser) {
      setUser(retrievedUser);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUserFn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
