import styled, {keyframes, css} from 'styled-components';
import {darken} from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 100%;
  padding: 32px;
  border-radius: 12px;
  background: #fff;
  margin: 30px auto;
  
  h1{
    svg{
      margin-right: 8px;
    }
    text-align: center;
    margin-bottom: 24px;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;


  .input-btn{
    display: flex;  
    width: 100%;
    input{
      width: 100%;
      border-radius: 7px 0 0 7px;
    }
  }
`;
export const List = styled.ul`
  margin: 16px 0;
  list-style: none;

  li{
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;

    span{
      display: flex;
    }

    a{
      color: #0d2636;
      text-decoration: none;
    }

    
  &:not(:last-child){
    border-bottom: 1px solid #eee;
  }
    
  }  
`;
export const DeleteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
  color: #0d2636;
  outline: 0;
`;
export const SubmitButton = styled.button.attrs(props => ({
  disabled: props.loading,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 7px 7px 0;
  border: none;
  width: 50px;
  background: #0d2636;
  transition: background .5s;

  &:hover{
    background: ${darken(0.1, '#0d2636' )}
  }
  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading && 
    css`
      svg{
        animation: ${animate} infinite 2s linear;
      }
    `
  }
`;

export const ErrorAlert = styled.span`
  font-size: 14px;
  color: #FF2E2E;
  margin-top: 8px;
`;

//animações do button
const animate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg)
  }
`;