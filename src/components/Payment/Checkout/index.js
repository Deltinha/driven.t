import InfoText from "./InfoText";
import TicketResume from "./TicketResume";
import Payment from "./Payment";
import PaidConfirmation from "./PaidConfirmation";

export default function Checkout({ userTicket, setUserTicket }) {
  return (
    <>
      <TicketResume
        userTicket={userTicket}
      />
      <InfoText>Pagamento</InfoText>
      {userTicket?.isPaid ? (
        <PaidConfirmation />
      ) : (
        <Payment
          userTicket={userTicket}
          setUserTicket={setUserTicket}
        />
      )}
    </>
  );
}
