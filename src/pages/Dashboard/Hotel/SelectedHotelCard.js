import styled from "styled-components";
import Button from "../../../components/Form/Button";
import { getRoomTypeByMaxOcuppation } from "./Rooms/utils/getRoomTypeByMaxOccupation";
import TextSection from "./TextSection";

export default function SelectedHotel({ reservation, clearReservation }) {
  const {
    hotelName,
    hotelImage,
    roomNumber,
    currentOccupation,
    maxOccupation,
  } = reservation;
  const roomType = getRoomTypeByMaxOcuppation(maxOccupation);

  return (
    <>
      <PageTitle>Você já escolheu seu quarto:</PageTitle>
      <Container>
        <Banner image={hotelImage} />
        <Title>{hotelName}</Title>

        <TextSection
          title="Quarto reservado"
          content={`${roomNumber} (${roomType})`}
        />
        <TextSection
          title="Pessoas no seu Quarto"
          content={
            currentOccupation > 1
              ? `Você e mais ${currentOccupation - 1}`
              : "Só você"
          }
        />
      </Container>
      <Button onClick={clearReservation}>TROCAR DE QUARTO</Button>
    </>
  );
}

const Container = styled.div`
  width: 196px;
  height: 264px;
  background-color: #ffeed2;
  margin: 10px 0px;
  border-radius: 10px;
  padding: 15px;
`;

const PageTitle = styled.p`
  color: #8e8e8e;
  font-size: 20px;
  margin: 36px 0;
`;

const Banner = styled.div`
  height: 109px;
  width: 168px;
  border-radius: 5px;
  background: url(${({ image }) => image});
  background-size: cover;
`;

const Title = styled.p`
  color: #343434;
  font-size: 20px;
  margin: 10px 0;
`;

