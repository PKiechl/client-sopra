import { getDomain } from "../helpers/getDomain";

export const logout = ({props}) => {

	const status = response => {
		if (response.status === 204) {
			alert("Successful logout. Good Bye! (for now ;D)");
			return Promise.resolve(response);
		}
		return Promise.reject(new Error(response.statusText));
	};

	let token = localStorage.getItem("token");
	localStorage.removeItem("token");

	fetch(`${getDomain()}/logout`, {
		method: "PUT",
		headers: {
			"Content-Type": "text/plain"
			// since we only send the token
		},
		body: token })
			// only send the token
			.then(status)

			.catch(err => {
				console.log(err);
				alert("User status was not updated, something went wrong.")
				// local "logout" still happens though
			});

	return props.history.push("/login");

};