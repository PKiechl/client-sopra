import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { Link, withRouter } from "react-router-dom";
//*******************************
import PlayerProfile from "../../views/PlayerProfile";
import User from "../shared/models/User";
// not sure if all needed

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
// not sure if all needed

// TODO: userProfileGuard à la GameGuard with redirect to /Login

class UserProfile extends React.Component {

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

	logout() {
		localStorage.removeItem("token");
		this.props.history.push("/login");
	}

	fetchBeforeRender() {
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
				/*
				this.setState({ thisUser: user }, () => {
					console.log(this.state.thisUser) // so apparently setState can be troublesome since it might be delayed
				});
				*/
				alert("mapping fetched user data to state.thisUser done");
				// this is supposed to update the state.user with the fetched information
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong fetching the user with ID:" + err);
				// curious if this works
			});
	}



	componentWillMount() {
		// triggers before rendering, which is essential, since i am rendering state information which is not present
		// before the fetch calls to the server, meaning i get TypeErrors like 'Cannot read property 'XYZ' of null,
		// since the user is set to null in the beginning

		//
		this.fetchBeforeRender();
	}

 // *******************STORAGE OF SHIT I CAN?T COMMENT OUT***************
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




 					<PlayerProfile user={this.state.user}/>

*/


	// TODO: change the effin color for Linked shite
	render() {
		//const {match} = this.props;
		//const id = this.props.id;

		return(
			<BaseContainer>
				<Container>

					{this.state.user == null ? (
						<Spinner />
					) : (
						<h3>ID: {this.state.user.id}</h3>)}


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


export default withRouter(UserProfile);