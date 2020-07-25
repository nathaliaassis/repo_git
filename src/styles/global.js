import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: 0;
  }
  html, body, #root{
    height: 100%;
    width: 100%;
  }
  body{
    background: #0d2636;
    -webkit-font-smoothing: antialiased !important;
  }
  body, input, button{
    font-size: 14px;
    color: #222;
    font-family: Arial, Helvetica, sans-serif;
  }
  button, a {
    cursor: pointer;
    text-decoration: none;
  }  
  input{
    height: 28px;
    border: 1px solid #00000012;
    padding: 5px 12px;
  }
`;