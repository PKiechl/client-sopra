import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button, InvisButton } from "../../views/design/Button";
import { Link, withRouter } from "react-router-dom";
//*******************************
import PlayerProfile from "../../views/PlayerProfile";
import User from "../shared/models/User";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;
const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;
const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
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

// TODO: remove unneeded in the end


class EditProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: null,
			// reads the updated username
			birthdayDate: null,
			// reads the updated birthdayDate
			user: props.location.state.user,
			// stores the 'pushed-in' user data
			message: null
			// potential error message assigned to this
		};
		this.user = props.location.state.user;
		// perhaps this might work in the render
	}


	handleInputChange(key, value) {
		// Example: if the key is username, this statement is the equivalent to the following one:
		// this.setState({'username': value});
		this.setState({ [key]: value });
	}


	getBody() {
		if (!this.state.username) {
			alert("Birthday");
			// if only birthday altered
			return JSON.stringify({
				id: this.state.user.id,
				username: this.state.user.username,
				// username is needed, as well as id for the put request, both pulled from pushed in user data
				birthdayDate: this.state.birthdayDate
			})
		}
		else if (!this.state.birthdayDate) {
			alert("Username");
			// if only username altered
			return JSON.stringify({
				id: this.state.user.id,
				// id always needed, since non-nullable
				username: this.state.username,
				// new username
				birthdayDate: this.state.user.birthdayDate
				// (old) birthdayDate from pushed in user data
			})
		}
		else {
			alert("Both");
			// if both username & birthday altered
			return JSON.stringify({
				id: this.state.user.id,
				// always needed, since non-nullable
				username: this.state.username,
				birthdayDate: this.state.birthdayDate
				// updated username & birthday
			})
		}
	}


	updateState() {
		alert("reached update state");

		const status = response => {
			if (response.status === 200) {
				return Promise.resolve(response);
			}
			return Promise.reject(new Error(response.statusText))
		};

		const json = response => response.json();
		// json-ify incoming user data

		fetch(`${getDomain()}/users/` + this.state.user.id, {
			// fetches user data of newly updated user
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(status)
			.then(json)
			.then(data => {
				this.setState({user: data});
				// overwrite state with updated user data
				let user = this.state.user;
				// this seems to be the only way to make this user accessible in the history.push, seems ood
				this.props.history.push({pathname: `/userProfile/` + this.state.user.id, state: {user} })
			})
			.catch(err => {
				alert(`Failed fetching updated user data: ${err.message}`);
			})
	}

	/*
	saveChanges() {
		// let's try this the ugly way
		if(!this.state.username) {
			// only birthday altered
		}
		else if(!this.state.birthdayDate) {
			// only username altered
		}
		else {
			// both altered
			fetch(`${getDomain()}/users/`+this.state.user.id, {
				method: "PUT",
				// i keep  getting 'preflight response is not successful'
				// mode: "no-cors",
				// not supported for PUT method,
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: this.state.user.id,
					username: this.state.username,
					birthdayDate: this.state.birthdayDate
					}) // value: stringify
			})// init : fetch
				.then(response => {
					alert("reached response");
					if (response.status === 204) {
						alert(response.status + " user data updated successfully!");
						this.updateState();
					}
					else {
						alert(response.status + ": user data not updated, username already taken!");
						// might need to be differentiated some more
					}
				})
				.catch(err => {
					if (err.message.match(/Failed to fetch/)) {
						alert("The server cannot be reached. Did you start it?");
					} else {
						alert(`Something went wrong when updating the user data: ${err.message}`);
					}
				});
		}// else
	} // saveChanges
	*/

	saveChanges() {

		const status = response => {
			// handles the incoming http status, if 204 then proceed, else to .catch
			if (response.status === 204) {
				// 204 is the status code the server returns upon successful request
				return Promise.resolve(response);
			}
			return Promise.reject(new Error(response.statusText));
		};

		const text = response => {
			this.setState({message: response.text()});
			// TODO: this does not work as expected yet
			// in this case, we only expect a response body if an error occurs,
			// error text assigned to this.state.message.
		};

		fetch(`${getDomain()}/users/` + this.state.user.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: this.getBody()
		})
			.then(status)
			.then(text)
			.then(data => {
				this.updateState();
			})
			.catch(err => {
				// we'll see if this works
				alert("User data was not updated: " + this.state.message)
			})

	} // saveChanges


	render() {
		return(

			<BaseContainer>
				<FormContainer>
					<Form>
						<h3>Edit {this.state.user.username}'s Profile</h3>

						<Label>Edit Username</Label>
						<InputField
							placeholder="Enter new username.."
							onChange={e => {
								this.handleInputChange("username", e.target.value);
							}}
						/>

						<Label>Edit Birthday</Label>
						<InputField
							placeholder="Enter new birthday.."
							onChange={e => {
								this.handleInputChange("birthdayDate", e.target.value);
							}}
						/>

						<ButtonContainer>
							<Button
								width="50%"
								disabled={(!this.state.username && !this.state.birthdayDate)
								// can choose to update only one of them
								|| !(this.user.token === localStorage.getItem("token")) }
								// is intended to work such that if the token in the local Storage (which is set in the Login to be
								// equal to the token of the (most recently) logged-in user is equal to the token of the user whose profile
								// this is, then it can be edited, since logged-in user = user who owns profile
								onClick={() => {
									this.saveChanges()
								}}
							>
								Save
							</Button>
						</ButtonContainer>

						<ButtonContainer>
							<Button
								width="50%"
								onClick={() => {
									// redo this to return to user-profile, needs state information tho
									let user = this.state.user;
									this.props.history.push({pathname: `/userProfile/`+this.state.user.id, state:{user}})
								}}
							>
								Cancel
							</Button>
						</ButtonContainer>

					</Form>
				</FormContainer>
			</BaseContainer>

			)
	};


}

export default withRouter(EditProfile);