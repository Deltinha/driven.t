import { useState, useContext } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";

import TicketContext from "../../../contexts/TicketContext";

export default function SelectTickets() {
  const tickets = [
    { name: "Presencial", price: 250 },
    { name: "Online", price: 100 }
  ];

  const { ticketData, setTicketData } = useContext(TicketContext);
  const [selectedItem, setSelectedItem] = useState();

  function handleClick(name, price) { 
    if (selectedItem === name) {
      setSelectedItem(false);
      setTicketData({
        ...ticketData,
        ticketValue: ""
      });
    } else {
      setSelectedItem(name);
      setTicketData({
        ...ticketData,
        ticketValue: price
      });
    }
  }

  return (
    <>
      <InfoText>
      Primeiro, escolha sua modalidade de ingresso.
      </InfoText>

      <TicketArea>
        {tickets.map(ticket => (
          <Ticket  
            name={ticket.name} 
            price={ticket.price} 
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

