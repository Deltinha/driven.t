import { useState, useEffect } from "react";
import PaymentForm from "./PaymentForm";
import Button from "../../Form/Button";
import validations from "./FormValidations";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function Payment({ userTicket, setUserTicket }) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { ticket } = useApi();
  const history = useHistory();

  useEffect(() => {
    if (!userTicket) return history.push("/dashboard/payment");
  }, []);

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

    setLoading(true);

    ticket.payTicket()
      .then(() => {
        setUserTicket({
          ...userTicket,
          isPaid: true,
        });
        setLoading(false);
        toast("Pagamento efetuado!");
      })
      .catch((error) => {
        setLoading(false);
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
      <Button type="submit" disabled={!userTicket || loading}>
          Finalizar Pagamento
      </Button>
    </form>
  );
}
