import styled from "styled-components";

export default function WaitingPaymentMsg() {
  return (
    <CenterMessage>
      <p>
          Você precisa ter confirmado pagamento antes de fazer a escolha de
          atividades
      </p>
    </CenterMessage>
  );
}

const CenterMessage = styled.div`
  width: 100%;
  height: 80%;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #8e8e8e;
    text-align: center;
    font-size: 20px;
  }
`;
