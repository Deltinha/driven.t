import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";

import TicketContext from "../../../contexts/TicketContext";

import useApi from "../../../hooks/useApi";

export default function SelectTickets({ ticketsTypes }) {
  const { enrollment } = useApi();
  const { ticketData, setTicketData } = useContext(TicketContext);

  const [enrollmentId, setEnrollmentId] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    enrollment.getPersonalInformations()
      .then(res => setEnrollmentId(res.data.id))
      .catch(error => console.log(error));
  }, []);

  function handleClick(name, value) { 
    if (selectedItem === name) {
      setSelectedItem(false);
      setTicketData({
        ...ticketData,
        enrollmentId: enrollmentId,
        ticketInfo: ""
      });
    } else {
      setSelectedItem(name);
      setTicketData({
        ...ticketData,
        enrollmentId: enrollmentId,
        ticketInfo: { name, value }
      });
    }
  }

  return (
    <>
      <InfoText>
      Primeiro, escolha sua modalidade de ingresso.
      </InfoText>

      <TicketArea>
        {ticketsTypes.map(ticket => (
          <Ticket  
            name={ticket.name} 
            value={ticket.value} 
            selectTicket={handleClick} 
            isSelected={selectedItem === ticket.name}/>
        ))}
      </TicketArea>
    </>
  );
}

const InfoText = styled.p`
  color: #8E8E8E;
  font-size: 20px;
  line-height: 23px;
`;

const TicketArea = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 25px;
`;

