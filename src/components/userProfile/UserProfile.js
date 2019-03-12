import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { Button, InvisButton } from "../../views/design/Button";
import { Link, withRouter } from "react-router-dom";
//*******************************
import PlayerProfile from "../../views/PlayerProfile";
import { logout } from "../../helpers/logout";

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


class UserProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: props.location.state.user
			// assigns the user data pushed from Game to this.state.user
		};
	}

	render() {
		return(
			<Container>
				<h2>{this.state.user.username}'s Profile Page</h2>
				<div>

					<Users>
						<PlayerContainer
							key={this.state.user.id}
						>
							<PlayerProfile
								user={this.state.user}
							/>
						</PlayerContainer>
					</Users>

					<ButtonContainer>
						<Button
							width="25%"
							disabled={localStorage.getItem("token") !== this.state.user.token}
							// if the currently logged in users token matches the one in the local Storage (which preserves the one
							// of the most recently logged-in user, then editing is permitted
							onClick={() => {
								let directory = "/UserProfile/"+this.state.user.id+"/editProfile";
								let user = this.state.user;
								this.props.history.push({pathname: directory, state: {user}})
							}}
						>
							Edit Profile
						</Button>
					</ButtonContainer>

					<ButtonContainer>
						<Button
							width="25%"
							onClick={() => {
								this.props.history.push("/game/dashboard");
							}}
						>
							Back
						</Button>
					</ButtonContainer>

					<ButtonContainer>
						<Button
							width="25%"
							onClick={() => {
								logout(this);
								// grants access to this-scope to "external" function
							}}
						>
							Logout
						</Button>
					</ButtonContainer>

				</div>
			</Container>
		)
	}

}


export default withRouter(UserProfile);