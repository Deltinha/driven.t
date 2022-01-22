import styled from "styled-components";

export default function ForbidText({ children }) {
  return (
    <Div>
      <InfoText>{children}</InfoText>
    </Div>
  );
}

const Div = styled.div`
  height: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.p`
  color: #8E8E8E;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  width: 550px;
`;
