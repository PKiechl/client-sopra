import React from "react";
import styled from "styled-components";
import { InvisibleButton } from "../views/design/Button"
//************************
import {Redirect, withRouter, Link} from "react-router-dom";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid white;
`;
const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
  color: white;
`;
const Password = styled.div`
  font-weight: bold;
  color: #06c4ff;
`;
const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;


/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const Player = ({ props, user }) => {
	return (
		<Container>
			<InvisibleButton
			onClick={() => {
				let directory = "/UserProfile/"+user.id;
				props.history.push({
					pathname: directory,
					state: {user}
			}) // push
			}} // onClick
			>
				<UserName>
					{user.username}
				</UserName>
			</InvisibleButton>
			<Id>
				Id: {user.id}
			</Id>

		</Container>
	);
};


/*
const Player = ({ user }) => {
  return (
    <Container>

      <Password>
        {user.password}
      </Password>

        <UserName onClick={() =>{
          this.props.history.push("/userProfile/"+user.id)
          // does not work, Player has no state/props
        }}>
          {user.username}
        </UserName>

      <Id>
        Id: {user.id}
      </Id>

    </Container>
  );
};
*/
export default Player;
