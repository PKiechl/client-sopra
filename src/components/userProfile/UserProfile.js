import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { Link, withRouter } from "react-router-dom";
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
// not sure if all needed

// TODO: userProfileGuard à la GameGuard with redirect to /Login

class UserProfile extends React.Component {

	constructor() {
		super();
		this.state = {
			stats: null
			// that a list?
		};
	}

	// TODO: change the effin color for Linked shite
	render() {
		return(
			<BaseContainer>
				<Link to={"/game/dashboard"}>
					ABRAKADABRA
				</Link>
			</BaseContainer>
		)
	}
}


export default withRouter(UserProfile);