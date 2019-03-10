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


	/*
	constructor() {
		super();
		this.state = {
			user: null,
			// incoming user data should be assigned to this
			id: 1
			// the id from the "users/ID" should be somehow fed into this. perhaps props are needed, not really
			// sure how they work though.
		};
	}
	*/
	/*
	fetchBeforeRender() {
		// was meant to function with componentWillMount, to map data to the state before rendering but i could not get it to work :(
		fetch(`${getDomain()}/users/`+this.state.id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(async response =>{
				alert(response.status);
				response.json();

			})
			.then(userX => {
				alert("mapping");
				this.setState({user: userX});
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong fetching the user" + err);
			});
	}
	*/
	/*
	getMyData() {
		// ComponentDidMount gets called immediately after a component is mounted (inserted into the tree)
		// instantiating network requests can/should be done here

		// ! renamed to getMyData(), then called in componentWillMount() to ensure the data is fetched before
		// rendering

		fetch(`${getDomain()}/users/`+this.state.id, {

			//    (don't think so) ?param={this.id} after /users/
			// needs to modify to /users/ID to only fetch the actually needed user

			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				alert(response.status);
				response.json();
			})
			.then(async user => {
				alert("mapping fetched user data to state.thisUser");

				// delays continuous execution of an async operation for 0.8 seconds.
				// This is just a fake async call, so that the spinner can be displayed
				// feel free to remove it :)
				await new Promise(resolve => setTimeout(resolve, 800));

				this.setState({user: user}, () => {
					console.log(this.state.user)
				});

				alert("mapping fetched user data to state.thisUser done");
				// this is supposed to update the state.user with the fetched information
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong fetching the user with ID:" + err);
				// curious if this works
			});
	}
	*/
	/*
	componentWillMount() {
		this.getMyData;
	}
	*/
 // *******************STORAGE OF SHIT I CAN'T COMMENT OUT*********************
	/* attempt at creating a PlayerProfile

					<div>
						{this.state.user.map(user => {
								return(
									<PlayerContainer key={user.id}>
										<PlayerProfile user={user}/>
									</PlayerContainer>

								)
							}

						)}
					</div>
------------------------
					{this.state.user == null ? (
						<h3>I LOVE IT WHEN NOTHING WORKS</h3>
					) : (
						<h3>ID: {id}</h3>)}


--------------------------



 					<PlayerProfile user={this.state.user}/>

*/
	/*

	// TODO: change the effin color for Linked shite
	render() {

		return(
			<BaseContainer>
				<Container>

					<p> THESE WERE THEM USERS </p>

					<Link to={"/game/dashboard"}>
						<ButtonContainer>
							<Button
							width="50%"
							>
								Move to Dashboard
							</Button>
						</ButtonContainer>
					</Link>

					<ButtonContainer>
						<Button
						width="50%"
						onClick={ () => {
							this.logout()
						}}
						>
							Logout
						</Button>
					</ButtonContainer>

				</Container>
			</BaseContainer>
		)
	}
}

	*/

export default withRouter(UserProfile);