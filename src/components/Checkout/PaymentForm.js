import styled from "styled-components";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Input from "../Form/Input";

export default function PaymentForm({ number, setNumber, name, setName, expiry, setExpiry, cvc, setCvc }) {
  return (
    <CardBox>
      <Cards
        cvc={cvc}
        expiry={expiry}
        name={name}
        number={number}
      />
      <CreditCardData>
        <Input
          type="tel"
          name="number"
          value={number}
          mask={"9999 9999 9999 9999"}
          label="Número do Cartão"
          onChange={(event) => setNumber(event.target.value)}
          required
        />
        <Input
          type="text"
          name="name"
          value={name.toUpperCase()}
          label="Nome"
          onChange={(event) => setName(event.target.value)}
          required
        />
        <LastRow>
          <Input
            type="tel"
            name="expiry"
            value={expiry}
            mask={"99/99"}
            label="Validade"
            onChange={(event) => setExpiry(event.target.value)}
            required
          />
          <Input
            type="tel"
            name="cvc"
            value={cvc}
            mask={"999"}
            label="Código"
            onChange={(event) => setCvc(event.target.value)}
            required
          />
        </LastRow>
      </CreditCardData>
    </CardBox>
  );
}

const CardBox = styled.div`
  margin: 15px;
  width: 80%;
  display: flex;
  margin-bottom: 50px;
`;

const CreditCardData = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  & input {
    height: 12px;
  }
`;

const LastRow = styled.div`
  display: grid;
  grid-template-columns: 55% 30%;
  column-gap: 15%;
`;