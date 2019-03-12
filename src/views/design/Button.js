import styled from "styled-components";

export const Button = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;

export const InvisibleButton = styled.button`

	// i don't quite understand why this one functions so completely differently than the standard Button
	// on the /Game/dashboard page, but hey - it works. (no it doesn't needs adjusting)
	
	// when this was named invisButton (minor i) it was working exactly like i wanted it to, perhaps return to that
  //cursor: ${props => (props.disabled ? "default" : "pointer")};
  //transition: all 0.3s ease;
  //*********lets try this legit
 
  padding: 3px;
  text-align: center;
  color: white;
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;