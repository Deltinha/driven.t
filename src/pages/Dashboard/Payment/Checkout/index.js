import Checkout from "../../../../components/Payment/Checkout";

export default function CheckoutPage({ userTicket, setUserTicket }) {
  return (
    <Checkout userTicket={userTicket} setUserTicket={setUserTicket} />
  );
}
