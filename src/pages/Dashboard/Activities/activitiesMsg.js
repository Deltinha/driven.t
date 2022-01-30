import styled from "styled-components";

export default function ActivitiesMsg() {
  return (
    <CenterMessage>
      <p>
      Sua modalidade de ingresso não necessita escolher
atividade. Você terá acesso a todas as atividades.
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
