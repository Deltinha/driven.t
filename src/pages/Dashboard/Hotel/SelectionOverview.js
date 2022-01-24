import { useEffect, useState } from "react";
import styled from "styled-components";

export default function SelectionOverview({ booking, HotelOption, setIsEditing, setBookedRoom, setSelectedRoom, selectedRoom }) {
  const [roomNumberText, setRoomNumberText] = useState("");
  const [pplInRoomText, setPplInRoomText] = useState("");

  useEffect(() => {
    const occupationText = {
      1: "(Single)",
      2: "(Double)",
      3: "(Triple)"
    };
    setRoomNumberText(`${booking.roomNumber} ${occupationText[booking.roomMaxOccupation]}`);

    const pplText = {
      1: "",
      2: "e mais 1",
      3: "e mais 2",
      4: "e mais 3",
    };
    setPplInRoomText(`Você ${pplText[booking.roomCurOccupation]}`);
    setBookedRoom(booking.id);
    setSelectedRoom(booking.id);
  }, [selectedRoom, booking]);

  function deleteBookingInfo() {
    setIsEditing((prev) => !prev);
  }

  return (<>
    <InfoText>
      Você já escolheu seu quarto:
    </InfoText>
    <HotelOption
      styled
      image={booking.hotelImage}>
      <div className="image"></div>
      <p className="title">{booking.hotelName}</p>
      <p className="subtitles">Quarto reservado</p>
      <p className="values">{roomNumberText}</p>
      <p className="subtitles">Pessoas no seu quarto</p>
      <p className="values">{pplInRoomText}</p>
    </HotelOption>
    <ChangeRooms onClick={deleteBookingInfo}>TROCAR DE QUARTO</ChangeRooms>
  </>);
}

const InfoText = styled.p`
  color: #8E8E8E;
  font-size: 20px;
  line-height: 23px;
`;

const ChangeRooms = styled.button`
  width: 182px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  margin: 20px 15px;
  cursor: pointer;
`;
