import styled from "styled-components";
import { FaCheckCircle as CheckIcon } from "react-icons/fa";

export default function PaidConfirmation() {
  return (
    <Container>
      <CheckIcon
        fontSize="45px"
        color="#36B853"
      />
      <TextBox>
        <Confirmation>
          Pagamento confirmado!
        </Confirmation>
        <NextSteps>
          Prossiga para escolha de hospedagem e atividades
        </NextSteps>
      </TextBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
`;

const Confirmation = styled.h5`
  font-size: 16px;
  font-weight: 700;
`;

const NextSteps = styled.p`
  font-size: 16px;
  font-weight: 400;
`;
