import { useContext } from "react";
import TicketContext from "../../../contexts/TicketContext";
import styled from "styled-components";
import InfoText from "./InfoText";
import { TicketCard, Name, Value } from "../Tickets/Ticket";

export default function TicketResume() {
  const { ticketData } = useContext(TicketContext);

  return (
    <>
      <InfoText>Ingresso escolhido</InfoText>
      {ticketData && <StyledTicket>
        <Name>{ticketData.ticketsTypeId?.name.concat(ticketData?.hasHotel ? " + Com Hotel" : "")}</Name>
        <Value>R$ {Number(ticketData.value)}</Value>
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
