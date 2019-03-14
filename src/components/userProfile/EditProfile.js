import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Button, InvisButton } from "../../views/design/Button";
import { Link, withRouter } from "react-router-dom";
//*******************************

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
const Label2 = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: bold;
`;


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
		};
		this.user = props.location.state.user;
		// perhaps this might work in the render
	}


	handleInputChange(key, value) {
		// Example: if the key is username, this statement is the equivalent to the following one:
		// this.setState({'username': value});
		this.setState({ [key]: value });
	}


	validBirthday(str) {
		const birthdayRegex = /^([0-9]{2}\.[0-9]{2}\.[0-9]{4})$/;
		// supposedly matches DD.MM.YYYY
		if(str===null) {
			return true;
			// since the user might chose to not edit his birthday
		}
		return birthdayRegex.test(str);
	}


	getBody() {
		if (!this.state.username) {
			// if only birthday altered
			return JSON.stringify({
				id: this.state.user.id,
				username: this.state.user.username,
				// username is needed, as well as id for the put request, both pulled from pushed in user data
				birthdayDate: this.state.birthdayDate
			})
		}
		else if (!this.state.birthdayDate) {
			// if only username altered
			return JSON.stringify({
				id: this.state.user.id,
				// id always needed, since non-nullable
				username: this.state.username,
				// new username
			})
		}
		else {
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
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
				// sends the token of the currently logged in user to authenticate the request
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


	saveChanges() {

		const status = response => {
			// handles the incoming http status, if 204 then proceed, else to .catch
			if (response.status === 204) {
				// 204 is the status code the server returns upon successful request
				return Promise.resolve(response);
			}
			return Promise.reject(new Error(response.statusText));
		};

		fetch(`${getDomain()}/users/` + this.state.user.id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Token": localStorage.getItem("token")
			},
			body: this.getBody()
		})
			.then(status)
			.then(data => {
				this.updateState();
				alert("User data successfully updated!");
			})
			.catch(err => {
				// we'll see if this works
				alert("User data was not updated! That Username is already taken!")
			})

	} // saveChanges⁄


	render() {
		let birthday = this.state.birthdayDate;
		return(

			<BaseContainer>
				<FormContainer>
					<Form>
						<Label2>Edit {this.state.user.username}'s Profile</Label2>

						<Label>Edit Username</Label>
						<InputField
							placeholder="Enter new username.."
							onChange={e => {
								this.handleInputChange("username", e.target.value);
							}}
						/>

						<Label>Edit Birthday (DD.MM.YYYY)</Label>
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
									|| !(this.user.token === localStorage.getItem("token"))
									// is intended to work such that if the token in the local Storage (which is set in the Login to be
									// equal to the token of the (most recently) logged-in user is equal to the token of the user whose profile
									// this is, then it can be edited, since logged-in user = user who owns profile
									|| !(this.validBirthday(birthday))
								}
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