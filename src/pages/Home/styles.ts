import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /*Para quando a tela for menor a linha quebrar*/
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 0.5rem;

  color: ${props => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
`;

export const CountdownContainer = styled.div`
  display: flex;

  gap: 1rem;

  color: ${(props) => props.theme["gray-100"]};
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;

  span {
    background: ${(props) => props.theme["gray-700"]};

    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  display: flex;
  justify-content: center;

  width: 4rem;
  padding: 2rem 0;

  color: ${(props) => props.theme["gray-500"]};

  overflow: hidden;
`;
