import { createContext, useMemo } from "react";
import { createId } from "../utils/utils";

export const AuthContext = createContext({ clientId: "" });

const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const clientId = useMemo(createId, []);

  return (
    <AuthContext.Provider value={{ clientId }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
