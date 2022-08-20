import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  background-color:rgb(19, 20, 20);
  flex-direction: column;
`;

export const CardContainer = styled.div`
  padding: 5rem;
  width: 100%;
  display: grid;
  grid-gap: 1rem 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  justify-content: space-evenly;
  padding-left: 80px;
  padding-right: 80px;
 
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media only screen and (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 580px) {
    padding: 40px;
    grid-template-columns: 1fr;
  }
`;
export const ContainerDropDown = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-color: aliceblue;
  border-width: 1rem;
  border-bottom: 1rem;
  @media only screen and (max-width: 580px) {
    width: 90%;
    grid-template-columns: 1fr;
    padding-left: 30px;
    padding-right: 30px;
  }
`;
