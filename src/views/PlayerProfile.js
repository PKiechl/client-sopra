// this servers as a Player object where all the components are rendered that the userProfile is required to display

import React from "react";
import styled from "styled-components";
//************************

const Container = styled.div`
  margin: 6px 0;
  width: 360px;
  height: 180px;
  padding: 10px;
  border-radius: 6px;
  display: inline;
  align-items: start;
  border: 1px solid white;
`;

const UserName = styled.div`
  font-weight: bold;
	color: white;
  margin-bottom: 20px;
`;

const Intel = styled.div`
  font-weight: bold;
  color: #0dcffc;
  margin-bottom: 20px;

`;

const Date = styled.div`
  font-weight: lighter;
  margin-bottom: 20px;
`;



const PlayerProfile = ({ user }) => {
	return (
		<Container>

			<UserName>
				username: {user.username}
			</UserName>

			<Intel
			// Online status
			>
				online-status: {user.status}
			</Intel>

			<Intel
				// BDay
				>
				birthday: {user.birthdayDate}
			</Intel>

			<Date
				// CreationDate
			>
				creation-date: {user.creationDate}
			</Date>

		</Container>
	)
};

export default PlayerProfile;