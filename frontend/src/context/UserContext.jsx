import { createContext, useContext, useState } from "react";
import React from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState(0);
	const [userName, setUserName] = useState("");
	const [userData, setUserData] = useState([]);
	return (
		<UserContext.Provider
			value={{
				userId,
				setUserId,
				setUserName,
				userName,
				userData,
				setUserData,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	return context;
};