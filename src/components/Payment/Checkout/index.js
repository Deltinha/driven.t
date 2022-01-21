import styled from "styled-components";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import Button from "../../Form/Button";
import validations from "./FormValidations";

export default function Checkout() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});

  function submitPayment(event) {
    event.preventDefault();

    const verifyErrors = {
      number: validations.number.isValid(number) ? null : validations.number.message,
      issuer: validations.issuer.isValid(number) ? null : validations.issuer.message,
      name: validations.name.isValid(name) ? null : validations.name.message,
      expiry: validations.expiry.isValid(expiry) ? null : validations.expiry.message,
      cvc: validations.cvc.isValid(cvc) ? null : validations.cvc.message,
    };
    setErrors(verifyErrors);

    if (Object.values(verifyErrors).some((error) => error)) return;
  }

  return (
    <>
      <InfoText>Pagamento</InfoText>
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
    </>
  );
}

const InfoText = styled.p`
  color: #8E8E8E;
  font-size: 20px;
  line-height: 23px;
`;
