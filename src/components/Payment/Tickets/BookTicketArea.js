import styled from "styled-components";

export default function BookTicketArea({ ticketData, handleClick }) {
  return (
    <Div>
      Fechado! O total ficou em <strong>R$ {ticketData.ticketInfo.value}</strong>. Agora é só confirmar:
      
      <Button disabled={!ticketData.ticketInfo} onClick={handleClick}>
        RESERVAR INGRESSO
      </Button>
    </Div>
  );
}

const Div = styled.div`
  margin-top: 40px;
  color: #8E8E8E;
`;

const Button = styled.button`
  display: block;
  margin-top: 17px;
  background-color: #E0E0E0;
  border: 0;
  border-radius: 4px;
  height: 37px;
  width: 180px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  font-size: 14px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
`;
