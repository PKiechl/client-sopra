import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import {Redirect, withRouter, Link} from "react-router-dom";
import { Button } from "../../views/design/Button";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {

	/**
	 * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
	 * The constructor for a React component is called before it is mounted (rendered).
	 * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
	 * These fields are then handled in the onChange() methods in the resp. InputFields
	 */
	constructor() {
		super();
		this.state = {
			password: null,
			username: null,
			user: null
		};
	}


	login() {
		// praise be! for future reference: https://flaviocopes.com/javascript-promises/
		// the three-step promise chaining is gold. 1) check for status, 2) transform response, if needed, 3) handle data as needed

		const status = response => {
			if (response.status === 200) {
				return Promise.resolve(response)
				// expected server response in case of a successful request, resolve Promise
			}
			return Promise.reject(new Error(response.statusText))
			// should the returned status code not match the expectation, the request failed and we hand the Error to
			// the .catch block to log/alert
		};

		const json = response => response.json();

		fetch(`${getDomain()}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			})
		})
			.then(status)
			// reads returned http status code, immediately to .catch, if not correct response.
			.then(json)
			// json-ify the returned data.
			.then(data=> {
				this.setState({user: data});
				localStorage.setItem("token", this.state.user.token);
				// assigns the most recently logged-in users token to the local storage. this can then be used to verify if the editing
				// of a userProfile is authorized.

				alert("Login successful! Welcome " + this.state.user.username + "!");
				console.log("set state, storing " + this.state.user.username + "'s token '" + this.state.user.token + "' to localStorage.");

				this.props.history.push(`/game`)
				// pushes to /game (/dashboard)
			})
			.catch(err => {
				if (err.message.match(/Failed to fetch/)) {
					alert("The server cannot be reached. Did you start it?");
				} else {
					alert(`Something went wrong during the login, invalid credentials.`);
				}
			});
	}

	/**
	 *  Every time the user enters something in the input field, the state gets updated.
	 * @param key (the key of the state for identifying the field that needs to be updated)
	 * @param value (the value that gets assigned to the identified state key)
	 */
	handleInputChange(key, value) {
		// Example: if the key is username, this statement is the equivalent to the following one:
		// this.setState({'username': value});
		this.setState({ [key]: value });
	}

	/**
	 * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
	 * Initialization that requires DOM nodes should go here.
	 * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
	 * You may call setState() immediately in componentDidMount().
	 * It will trigger an extra rendering, but it will happen before the browser updates the screen.
	 */
	componentDidMount() {}

	render() {
		return (
			<BaseContainer>
				<FormContainer>
					<Form>

						<Label>Username</Label>
						<InputField
							placeholder="Enter here../IN LOGIN"
							onChange={e => {
								this.handleInputChange("username", e.target.value);
							}}
						/>

						<Label>Password</Label>
						<InputField
							placeholder="Enter here../IN LOGIN"
							onChange={e => {
								this.handleInputChange("password", e.target.value);
								//this.handleInputChange("name", e.target.value);
							}}
						/>

						<ButtonContainer>
							<Button
								disabled={!this.state.username || !this.state.password}
								width="50%"
								onClick={() => {
									this.login();
								}}
							>
								Login
							</Button>
						</ButtonContainer>

						<Link to={"/register"}>
							<ButtonContainer>
								<Button
									width="50%"
								>
									Move to Register
								</Button>
							</ButtonContainer>
						</Link>
					</Form>
				</FormContainer>
			</BaseContainer>
		);
	}
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
