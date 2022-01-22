import styled from "styled-components";
import { getHotelTypeByRoomMaxOcuppation } from "./utils/getHotelTypeByRoomMaxOccupation";

export default function HotelCard({
  name,
  maxOccupation,
  availableRooms,
  image,
  setSelectedHotel,
  selectedHotel,
  id,
}) {
  const hotelType = getHotelTypeByRoomMaxOcuppation(maxOccupation);

  return (
    <>
      <HotelOption
        id={id}
        image={image}
        selectedHotel={selectedHotel}
        onClick={() => setSelectedHotel(id)}
      >
        <div className="image"></div>
        <p className="title">{name}</p>
        <p className="subtitles">Tipos de acomodação:</p>
        <p className="values">{hotelType}</p>
        <p className="subtitles">Vagas disponíveis:</p>
        <p className="values">{availableRooms}</p>
      </HotelOption>
    </>
  );
}

const HotelOption = styled.li`
  width: 196px;
  height: 264px;
  background-color: ${(props) =>
    props.selectedHotel === props.id ? "#FFEED2" : "#f1f1f1"};
  margin: 10px 10px;
  border-radius: 10px;
  padding: 15px;
  .image {
    height: 109px;
    width: 168px;
    border-radius: 5px;
    background: url(${({ image }) => image});
    background-size: cover;
  }
  .title {
    color: #343434;
    font-size: 20px;
    margin: 10px 0;
  }
  .subtitles {
    font-size: 12px;
    color: #3c3c3c;
    font-weight: bold;
    margin-top: 10px;
  }
  .values {
    font-size: 12px;
    color: #3c3c3c;
    margin-top: 5px;
  }
`;
