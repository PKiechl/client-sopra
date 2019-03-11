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
			user: props.location.state.user
			// stores the 'pushed-in' user data
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
			alert("only bday");
			// if only birthday altered
			return JSON.stringify({
				id: this.state.user.id,
				username: this.state.user.username,
				// username is needed, as well as id for the put request, birthdayDate is optional
				birthdayDate: this.state.birthdayDate
			})
		}
		else if (!this.state.birthdayDate) {
			alert("only uname");
			// if only username altered
			return JSON.stringify({
				id: this.state.user.id,
				username: this.state.username
			})
		}
		else {
			alert("both be changed");
			// if both username & birthday altered
			return JSON.stringify({
				id: this.state.user.id,
				username: this.state.username,
				birthdayDate: this.state.birthdayDate
			})
		}
	}


	updateState() {
		alert("reached update state");
	}


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

	/*
	saveChanges() {
		fetch(`${getDomain()}/users/`+this.state.user.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: this.getBody()
			// doing this with conditionals does not appear to be working
		})

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

	}
	*/



	render() {
		return(

			<BaseContainer>
				<FormContainer>
					<Form>
						<h3>Edit {this.state.user.username}'s Profile Information</h3>

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
									this.props.history.push(`/Game/dashboard`)
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