import { createContext, useState } from "react";

const TicketContext = createContext();
export default TicketContext;

export function TicketProvider({ children }) {
  const [ticketData, setTicketData] = useState("");

  return (
    <TicketContext.Provider value={{ ticketData, setTicketData }}>
      {children}
    </TicketContext.Provider>
  );
}
