import { useState } from "react";
import PaymentForm from "./PaymentForm";
import Button from "../../Form/Button";
import validations from "./FormValidations";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";

export default function Payment({ ticketInfo, setTicketInfo }) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const { ticket } = useApi();

  function submitPayment(event) {
    event.preventDefault();
    
    const verifyErrors = {
      number: validations.number.isValid(number) ? null : validations.number.message,
      issuer: validations.issuer.isValid(number) ? null : validations.issuer.message,
      name: validations.name.isValid(name) ? null : validations.name.message,
      month: validations.expiry.month.isValid(expiry) ? null : validations.expiry.month.message,
      expired: validations.expiry.expired.isValid(expiry) ? null : validations.expiry.expired.message,
      cvc: validations.cvc.isValid(cvc) ? null : validations.cvc.message,
    };
    setErrors(verifyErrors);
    
    if (Object.values(verifyErrors).some((error) => error)) return;

    ticket.payTicket()
      .then(() => {
        setTicketInfo({
          ...ticketInfo,
          isPaid: true,
        });
        toast("Pagamento efetuado!");
      })
      .catch((error) => {
        toast(error.response.data.message);
      });
  }

  return (
    <form onSubmit={(event) => submitPayment(event)}>
      <PaymentForm
        number={number}
        setNumber={setNumber}
        name={name}
        setName={setName}
        expiry={expiry}
        setExpiry={setExpiry}
        cvc={cvc}
        setCvc={setCvc}
        errors={errors}
      />
      <Button type="submit">
          Finalizar Pagamento
      </Button>
    </form>
  );
}
