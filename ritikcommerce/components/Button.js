import styled, {css} from "styled-components";
import {primary} from "@/lib/colors";

export const ButtonStyle = css`
  border:0;
  padding: 5px 15px;
  border-radius: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  svg{
    height: 20px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
    padding: 10px;
  `}
  ${props => props.half && css`
    display: block;
    width: 30%;
    padding: 10px;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color:  black;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color:  white;
    border: 1px solid #fff;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color:  white;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color:  #333333;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color: #333333;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color: #333333;
  `}
  ${props => props.added && props.outline && css`
    background-color: yellow;
    border: 1px solid ${primary};
    color: black;
  `}
  ${props => props.category && props.outline && css`
    background-color: green;
    border: 1px solid ${primary};
    color: black;
    borderRadius: 10px;
    border: 2px solid black;
    padding:10px;
    cursor:pointer;
    :hover {
      background-color: white;
      color: green;
    }
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({children,...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}