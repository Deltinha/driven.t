import { useState, useContext } from "react";
import styled from "styled-components";
import Ticket from "./Ticket";

import TicketContext from "../../../contexts/TicketContext";

export default function SelectHosting({ hostingTypes }) {
  const { ticketData, setTicketData } = useContext(TicketContext);
  const { ticketInfo } = ticketData;

  const [selectedItem, setSelectedItem] = useState("");
  const [presentialTicketValue, setPresentialTicketValue] = useState(ticketInfo.value);

  function handleClick(name, value) {
    if (selectedItem === name) {
      setSelectedItem(false);
      setTicketData({
        ...ticketData,
        ticketInfo: {
          ...ticketInfo,
          value: name.includes("Com") ? ticketInfo.value - value : presentialTicketValue,
          hasHotel: name.includes("Com") ? true : false
        }
      });
    } else {
      setSelectedItem(name);
      setTicketData({
        ...ticketData,
        ticketInfo: {
          ...ticketInfo,
          value: name.includes("Com") ? ticketInfo.value + value : presentialTicketValue,
          hasHotel: name.includes("Com") ? true : false
        }
      });
    }
  }

  return (
    <>
      Ótimo! Agora escolha sua modalidade de hospedagem

      <HostingArea>
        {hostingTypes.map(host => (
          <Ticket 
            name={host.name}
            value={host.value}
            selectTicket={handleClick}
            isSelected={selectedItem === host.name}
          />
        ))}
      </HostingArea>
    </>
  );
}

const HostingArea = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 25px;
`;

