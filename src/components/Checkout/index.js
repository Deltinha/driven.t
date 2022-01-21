import styled from "styled-components";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
import Button from "../Form/Button";

export default function Checkout() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <>
      <InfoText>Pagamento</InfoText>
      <form>
        <PaymentForm
          number={number}
          setNumber={setNumber}
          name={name}
          setName={setName}
          expiry={expiry}
          setExpiry={setExpiry}
          cvc={cvc}
          setCvc={setCvc}
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
