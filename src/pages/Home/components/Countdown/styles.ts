import styled from "styled-components";

export const CountdownContainer = styled.div`
  display: flex;

  gap: 1rem;

  color: ${(props) => props.theme["gray-100"]};
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;

  span {
    background: ${(props) => props.theme["gray-700"]};

    border-radius: 8px;
    padding: 2rem 1rem;
  }
`;

export const Separator = styled.div`
  display: flex;
  justify-content: center;

  width: 4rem;
  padding: 2rem 0;

  color: ${(props) => props.theme["green-500"]};

  overflow: hidden;
`;
