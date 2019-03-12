// intended to replace the logout function

export const logout = ({props}) => {
	localStorage.removeItem("token");
	// this works
	return props.history.push("/login");
	// this does not (unsurprisingly so)
};