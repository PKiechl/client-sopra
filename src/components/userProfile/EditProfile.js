import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button, invisButton } from "../../views/design/Button";
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
		}

	}


	handleInputChange(key, value) {
		// Example: if the key is username, this statement is the equivalent to the following one:
		// this.setState({'username': value});
		this.setState({ [key]: value });
	}


	render() {
		return(

			<BaseContainer>
				<FormContainer>
					<Form>

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