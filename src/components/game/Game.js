import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button, InvisibleButton } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
//***************************
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
  padding-bottom: 20px;
  color: white;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }


  componentDidMount() {
    fetch(`${getDomain()}/users`, {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem("token")
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
        alert("Something went wrong fetching the users: " + err);
        // this one tends to pop up when debugging, no idea why.
      });
  }

  // GET request to server in GAME compwillmount, in server findbyTOkern, return true if valid token
  // if yes, do nothing, if no, clear localstorage redirect to login.
  componentWillMount() {

    const status = response => {
      if (response.status === 200) {
        // means a user with that token exists
        return Promise.resolve(response);
      }
      //Promise.reject(new Error(response.statusText));
      alert("jajajaj");
      localStorage.clear();
      this.props.history.push("/login");
      // clears invalid token
    };

    const str = response => response.json();


    fetch(`${getDomain()}/token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Token": localStorage.getItem("token")
      }
    })
      .then(status)
      .then(str)
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>

            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}>
                    <Player
                      props={this.props}
                      user={user}
                      />
                  </PlayerContainer>
                );
              })}
            </Users>

            <Button
              width="100%"
              onClick={() => {
                logout(this);
              }}
            >
              Logout
            </Button>

          </div>
        )}
      </Container>
    );
  }
}
/*

<invisButton
                      // with this Button the entire player container is a button, but i don't see
                      // how i could rectify that without having to place the button in the Player.js
                      // where the necessary state, props, history and such are not available

                    onClick = {() =>{
                      let directory = "/UserProfile/"+user.id;
                      this.props.history.push({
                        pathname: directory,
                        state:{user}
                        // pushes the state information about this particular user to
                        // the given directory, such that is available there as well.

                        // depending on how the user is identified when editing his profile,
                        // this might need to get expanded
                      })
                    }}>
                      <Player
                        user={user}
                      />
                    </invisButton>

 */



export default withRouter(Game);
