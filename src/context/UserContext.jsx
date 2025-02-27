import { useEffect, useState } from "react";
import { createContext } from "react";
export let UserContext = createContext();
export function UserContextProvider({ children }) {
    const [userLogin, setuserLogin] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token !== null) {
            setuserLogin(token);
        }
    }, []);

    console.log("userToken from context", localStorage.getItem("userToken"));
    return (
        <UserContext.Provider value={{ userLogin, setuserLogin }}>
            {children}
        </UserContext.Provider>
    );
}
