import { useEffect, useState } from "react";
import styled from "styled-components";
import useApi from "../../../hooks/useApi";
import HotelCard from "./HotelCard";

export default function HotelSelection({ selectedHotel, setSelectedHotel }) {
  const [isPresencial, setIsPresencial] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isHotel, setIsHotel] = useState(false);

  const { hotel, ticket } = useApi();

  const [hotelOptions, setHotelOptions] = useState([]);

  useEffect(() => {
    hotel.listAll().then((r) => {
      setHotelOptions(r.data);
    });
    fetchTicketInfo();
  }, []);

  const isPaidAndIsHotel = isPresencial && isPaid && isHotel;

  return (
    <>
      {isPaidAndIsHotel && <Title>Primeiro, escolha seu hotel</Title>}
      <ChooseHotel>
        {isPaidAndIsHotel &&
          hotelOptions.map((h) => (
            <HotelCard
              key={h.id}
              selectedHotel={selectedHotel}
              setSelectedHotel={setSelectedHotel}
              id={h.id}
              name={h.name}
              maxOccupation={h.maxRoomOccupation}
              availableRooms={h.availableRooms}
              image={h.image}
            />
          ))}
      </ChooseHotel>
      <CenterMessage hidden={isPaidAndIsHotel}>
        {isPaid ? (
          isPresencial && isHotel ? (
            ""
          ) : (
            <OnlineMessage>
              Sua modalidade de ingresso não inclui hospedagem
              <br />
              Prossiga para a escolha de atividades
            </OnlineMessage>
          )
        ) : (
          <NotPaidMessage>
            Você precisa ter confirmado pagamento antes
            <br />
            de fazer a escolha de hospedagem
          </NotPaidMessage>
        )}
      </CenterMessage>
    </>
  );

  function fetchTicketInfo() {
    ticket.get().then(({ data }) => {
      setIsPaid(data.isPaid);
      setIsPresencial(data.isPresential);
      setIsHotel(data.isHotel);
    });
  }
}

const ChooseHotel = styled.ul`
  width: 100%;
  display: flex;
`;
const Title = styled.p`
  color: #8e8e8e;
  font-size: 20px;
  margin: 36px 0;
`;
const CenterMessage = styled.div`
  width: 100%;
  height: 80%;
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: #8e8e8e;
    text-align: center;
    font-size: 20px;
  }
`;

const OnlineMessage = styled.p``;
const NotPaidMessage = styled.p``;
