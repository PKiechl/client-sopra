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

// Pasta from UserProfile done

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

			<Container>
				<h3>OHAI</h3>
				<h3>{this.state.user.id}</h3>
				<ButtonContainer>
					<Button
						width="25%"
						onClick={() => {
							// redo this to return to user-profile, needs state information tho
							this.props.history.push(`/Game/dashboard`)
						}}
					>
						Cancel
					</Button>
				</ButtonContainer>
			</Container>

			)
	};


}

export default withRouter(EditProfile);