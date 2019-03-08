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
		this.id = 1;
		//needs to become variable at some point
		this.state = {
			user: null
			// incoming user data should be assigned to this
		};
	}

	logout() {
		localStorage.removeItem("token");
		this.props.history.push("/login");
	}

	componentDidMount() {
		// Premium Pasta
		fetch(`${getDomain()}/users`+this.id, {
			//     ?param={this.id} after /users/
			// needs to modify to /users/ID to only fetch the actually needed user
			// not sure i actually need to fetch at all

			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(async user => {
				// delays continuous execution of an async operation for 0.8 seconds.
				// This is just a fake async call, so that the spinner can be displayed
				// feel free to remove it :)
				await new Promise(resolve => setTimeout(resolve, 800));

				this.setState({ user });
			})
			.catch(err => {
				console.log(err);
				alert("Something went wrong fetching the user: " + err);
			});
	}
 // *******************STORAGE OF SHIT I CAN?T COMMENT OUT***************
	/* attempt at creating a PlayerProfile
					<div>
						{this.state.user.map(user => {
								return(
									<PlayerContainer>
										<PlayerProfile user={user}/>
									</PlayerContainer>

								)
							}

						)}
					</div>
*/

	// TODO: change the effin color for Linked shite
	render() {
		const {match} = this.props;
		const id = this.props.id;
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


export default withRouter(UserProfile);