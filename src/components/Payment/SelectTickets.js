import { useState } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";

export default function SelectTickets() {
  const tickets = [
    { name: "Presencial", price: 250 },
    { name: "Online", price: 100 }
  ];

  const [selectedItem, setSelectedItem] = useState();

  function handleClick(name) { 
    selectedItem === name ? setSelectedItem(false) : setSelectedItem(name);
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

