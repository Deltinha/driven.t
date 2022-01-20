import styled from "styled-components";

export default function Ticket({ name, price }) {
  return (
    <TicketCard>
      <Name>{name}</Name>
      <Price>R$ {price}</Price>
    </TicketCard>
  );
}

const TicketCard = styled.div`
  border: 1px solid #CECECE;
  box-sizing: border-box;
  border-radius: 20px;
  width: 145px;
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Name = styled.p`
  color: #454545;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`;

const Price = styled.p`
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #898989;
  margin-top: 5px;
`;
