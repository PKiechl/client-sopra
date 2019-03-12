import { getDomain } from "../helpers/getDomain";

/*
export const logout = ({props}) => {
	localStorage.removeItem("token");
	// this works
	return props.history.push("/login");
	// this does not (unsurprisingly so)
};
*/

export const logout = ({props}) => {

	const status = response => {
		if (response.status === 204) {
			return Promise.resolve(response);
		}
		return Promise.reject(new Error(response.statusText));
	};

	//const text = response => response.text();

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
			//.then(text)

			.then( data => {
				return props.history.push("/login");
			})

			.catch(err => {
				alert("User status was not updated, something went wrong.")
			})
};