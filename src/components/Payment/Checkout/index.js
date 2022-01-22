import { useState } from "react";
import InfoText from "./InfoText";
import TicketResume from "./TicketResume";
import Payment from "./Payment";
import PaidConfirmation from "./PaidConfirmation";

export default function Checkout() {
  const [ticket, setTicket] = useState({});

  return (
    <>
      <TicketResume
        ticketInfo={ticket}
        setTicketInfo={setTicket}
      />
      <InfoText>Pagamento</InfoText>
      {ticket?.isPaid ? (
        <PaidConfirmation />
      ) : (
        <Payment />
      )}
    </>
  );
}
