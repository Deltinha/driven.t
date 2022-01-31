import styled from "styled-components";

export const InputWrapper = styled.div`
> div {
  width: 100%;
  
  @media (max-width: 600px) {
    display: ${({ isHidden }) => isHidden ? "none" : ""}
  }
}
`;
