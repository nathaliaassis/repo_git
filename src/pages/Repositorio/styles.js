import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 32px;
  border-radius: 12px;
  background: #fff;
  margin: 30px auto;
  color: #212121;

  svg{
    color: #ff8712;
  }
`;

export const Datas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 24px auto;
  max-width: 400px;

  h1{
    text-transform: capitalize;
    margin-bottom: 8px;
  }
  h4{
    font-weight: 200;
  }
  .img{
    height: auto;
    width: 100px;
    margin-bottom: 8px;
    border-radius: 5px;
  }
`;

export const Loading = styled.div`
`;

export const List = styled.ul`
  margin: 16px 0;
  list-style: none;

  li{
    display: flex;
    padding: 8px 0;
    transition: background 0.8s;

    span{
      display: flex;
    }

    .datas{
      margin-left: 16px;
    }

    a{
      display: flex;
      flex-direction:row;
      justify-content: flex;
      align-items: center;
      color: #0d2636;
      text-decoration: none;
    }
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 8px;
    }
    &:not(:last-child){
      border-bottom: 1px solid #eee;
    }

    &:hover{
      background: #eee;
      cursor: pointer;
    }
    
  }  
`;

export const Labels = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 4px;
`;

export const Label = styled.span`
  display: flex;
  background-color: #ff8712;
  padding: 2px 4px; 
  margin-right: 4px;
  margin-bottom: 4px;
  border-radius: 4px;

  font-size: 12px;
  font-weight: 300;
  color: white;
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button{
    outline: 0;
    border: 0;
    background: #ff8712;
    color: #fff;
    padding: 4px 12px;
    border-radius: 4px;

    &:disabled{
      background: #eee;
      cursor: not-allowed;
    }
  }
`;

export const FilterList = styled.div`
  margin: 8px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
  button{
    border: 1px solid #ff8712;
    background: transparent;
    padding: 4px 12px;
    color: #ff8712;
    border-radius: 4px;
    margin-right: 8px;
    transition: .5s;


    &:nth-child(${props=> props.active + 1}){
      background: #ff8712;
      color: #fff;
    }
    
    &:hover{
      background: #ff8712;
      color: #fff;
    }
  }
`;