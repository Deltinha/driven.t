import styled from "styled-components";
import InfoText from "./InfoText";
import { TicketCard, Name, Value } from "../Tickets/Ticket";

export default function TicketResume({ userTicket }) {
  return (
    <>
      <InfoText>Ingresso escolhido</InfoText>
      {userTicket && <StyledTicket>
        <Name>{userTicket.ticketsTypeId?.name.concat(userTicket?.hasHotel ? " + Com Hotel" : "")}</Name>
        <Value>R$ {Number(userTicket.value)}</Value>
      </StyledTicket>}
    </>
  );
}

const StyledTicket = styled(TicketCard)`
  margin: 20px 0 30px;
  width: fit-content;
  padding: 0 65px;
  height: 100px;
  background-color: #FFEED2;
  cursor: default;
`;
