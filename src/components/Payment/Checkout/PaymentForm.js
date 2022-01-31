
import styled from "styled-components";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Input from "../../Form/Input";
import { ErrorMsg } from "./ErrorMsg";

export default function PaymentForm({ number, setNumber, name, setName, expiry, setExpiry, cvc, setCvc, errors }) {
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
        {errors?.number && <ErrorMsg>{errors.number}</ErrorMsg>}
        {errors?.issuer && <ErrorMsg>{errors.issuer}</ErrorMsg>}
        <Input
          type="text"
          name="name"
          value={name.toUpperCase()}
          label="Nome"
          onChange={(event) => setName(event.target.value)}
          required
        />
        {errors?.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        <LastRow>
          <div>
            <Input
              type="tel"
              name="expiry"
              value={expiry}
              mask={"99/99"}
              label="Validade"
              onChange={(event) => setExpiry(event.target.value)}
              required
            />
            {(errors?.month || errors?.expired) && <ErrorMsg>{errors.month || errors.expired}</ErrorMsg>}
          </div>
          <div>
            <Input
              type="tel"
              name="cvc"
              value={cvc}
              mask={"999"}
              label="Código"
              onChange={(event) => setCvc(event.target.value)}
              required
            />
            {errors?.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
          </div>
        </LastRow>
      </CreditCardData>
    </CardBox>
  );
}

const CardBox = styled.div`
  margin: 15px;
  width: 90%;
  display: flex;
  margin-bottom: 50px;

  @media (max-width: 850px) {
    justify-content: flex-start;
    flex-direction: column;
  }
`;

const CreditCardData = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  & input {
    height: 12px;
  }

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const LastRow = styled.div`
  display: grid;
  grid-template-columns: 55% 30%;
  column-gap: 15%;
`;
