import { useContext } from "react";
import TicketContext from "../../../contexts/TicketContext";
import InfoText from "./InfoText";
import TicketResume from "./TicketResume";
import Payment from "./Payment";
import PaidConfirmation from "./PaidConfirmation";

export default function Checkout() {
  const { ticketData } = useContext(TicketContext);

  return (
    <>
      <TicketResume />
      <InfoText>Pagamento</InfoText>

      {ticketData?.isPaid ? (
        <PaidConfirmation hasHotel={ticketData.hasHotel} />
      ) : (
        <Payment />
      )}
    </>
  );
}
