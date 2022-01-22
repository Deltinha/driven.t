import styled from "styled-components";
import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import InfoText from "./InfoText";
import { TicketCard, Name, Price } from "../Ticket";

export default function TicketResume({ ticketInfo, setTicketInfo }) {
  const { ticket } = useApi();

  useEffect(() => {
    ticket.getTicketFromUser()
      .then((response) => setTicketInfo(response.data))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      <InfoText>Ingresso escolhido</InfoText>
      <StyledTicket>
        <Name>{ticketInfo.ticketsTypeId?.name.concat(ticketInfo?.hasHotel ? " + Com Hotel" : "")}</Name>
        <Price>R$ {ticketInfo.ticketsTypeId?.value + (ticketInfo?.hasHotel ? 350 : 0)}</Price>
      </StyledTicket>
    </>
  );
}

const StyledTicket = styled(TicketCard)`
  margin: 20px 0 25px;
  width: fit-content;
  padding: 0 65px;
  background-color: #FFEED2;
`;
