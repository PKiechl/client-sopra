import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

// Not sure yet all of these are needed

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;
const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;
const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
        };
    }

    register() {
        fetch(`${getDomain()}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(returnedUser => {
                const user = new User(returnedUser);
                // store the token into the local storage
                localStorage.setItem("token", user.token);
                // user login successfully worked --> navigate to the route /game in the GameRouter
                this.props.history.push(`/game`);
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the registration process: ${err.message}`);
                }
            });
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {}
    // not sure what this shit does

    render() {
        return(
            <BaseContainer>
                <FormContainer>
                    <Form>

                        <Label>Username</Label>
                        <InputField
                        placeholder="Enter u sack. on /register"
                        onChange={e => {
                            this.handleInputChange("username", e.target.value);
                        }}
                        />

                        <Label>Password</Label>
                        <InputField
                        placeholder="Enter u sack. on /register"
                        onChange={e => {
                            this.handleInputChange("password", e.target.value);
                        }}
                        />

                        <ButtonContainer>
                            <Button
                            disabled={!this.state.username || !this.state.password}
                            width="50%"
                            onCLick={() => {
                                this.register();
                            }}
                            >
                                Register (u sack)
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Register);