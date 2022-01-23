import styled from "styled-components";

export default function Ticket({ name, value, selectTicket, isSelected }) {
  return (
    <TicketCard selected={isSelected} onClick={() => selectTicket(name, value)}>
      <Name>{name}</Name>
      <Value>{name.includes("Hotel") ? "+" : ""} R$ {value}</Value>
    </TicketCard>
  );
}

export const TicketCard = styled.div`
  background-color: ${({ selected }) => selected ? "#FFEED2" : "#FFFFFF"};
  border: ${({ selected }) => selected ? "none" : "1px solid #CECECE"};
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

export const Name = styled.p`
  color: #454545;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`;

export const Value = styled.p`
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #898989;
  margin-top: 5px;
`;
