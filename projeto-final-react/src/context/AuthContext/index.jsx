import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function Context(props) {
  const [token, setToken] = useState();
  const [roles, setRoles] = useState();
  const [id, setId] = useState();

  function handleSetToken(token) {
    setToken(token);
    setId(JSON.parse(atob(token.split(".")[1])).sub);
    // setRoles(JSON.parse(atob(token.split(".")[1])).roles);
  }

  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      handleSetToken(localStorage.getItem("Authorization"));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, roles, id, handleSetToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}
