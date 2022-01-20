import styled from "styled-components";

export default function NotEnrollment() {
  return (
    <Div>
      <InfoText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso.</InfoText>
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
  width: 440px;
`;
