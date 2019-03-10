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

class UserProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: props.location.state.user
			// assigns the user data pushed from Game to this.state.user
		};
	}

	/*
	componentWillMount() {
		// ensures that user state is set before rendering happens
		this.setState({user: this.props.user})
	}
*/

/*************STORAGE****************
 <Users>
 <PlayerContainer
 key={this.props.user.id}
 >
 <PlayerProfile
 user={this.user}
 />
 </PlayerContainer>
 </Users>




 */



	render() {
		return(
			<Container>
				<h2>Profile Page of *placeholder*</h2>
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
							//here will be some pushing, deactivate if id does not match
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
								this.logout();
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




/*
// TODO: userProfileGuard à la GameGuard with redirect to /Login
class UserProfile extends React.Component {

	constructor() {
		super();
		this.state = {
			users: null
		};
	}

	logout() {
		localStorage.removeItem("token");
		this.props.history.push("/login");
	}

	componentDidMount() {
		fetch(`${getDomain()}/users`, {

			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(async users => {
				// delays continuous execution of an async operation for 0.8 seconds.
				// This is just a fake async call, so that the spinner can be displayed
				// feel free to remove it :)
				await new Promise(resolve => setTimeout(resolve, 800));

				this.setState({ users });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		const {match} = this.props;
		const id = match.params.id;

		return (
			<Container>
				<h2> Profile of user *placeholder* </h2>
				{!this.state.users ? (
					<Spinner />
				) : (
					<div>

						<Users>
							{this.state.users.map(user => {
								if (user.id == id) {
									return (
										<PlayerContainer key={user.id}>
											<PlayerProfile
												user={user}
											/>
										</PlayerContainer>
									);
								}
							})}
						</Users>


						<ButtonContainer>
							<Button
							width="25%"
							//here will be some pushing, deactivate if id does not match
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
								this.logout();
							}}
						>
							Logout
						</Button>
						</ButtonContainer>

					</div>
				)}
			</Container>
		);
	}


}

*/

export default withRouter(UserProfile);