import { ReactNode } from "react";
import { UserProvider } from "./userContext";

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};
