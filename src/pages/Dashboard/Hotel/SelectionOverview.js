import { useEffect, useState } from "react";
import styled from "styled-components";

export default function SelectionOverview({ booking, HotelOption }) {
  const [roomNumberText, setRoomNumberText] = useState("");
  const [pplInRoomText, setPplInRoomText] = useState("");
  
  useEffect(() => {
    const occupationText = {
      1: "(Single)",
      2: "(Double)",
      3: "(Triple)"
    };
    setRoomNumberText(`${booking.roomMaxOccupation} ${occupationText[booking.roomMaxOccupation]}`);

    const pplText = {
      1: "",
      2: "e mais 1",
      3: "e mais 2",
      4: "e mais 3",
    };
    setPplInRoomText(`Você ${pplText[booking.roomCurOccupation]}`);
  });

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
  </>);
}

const InfoText = styled.p`
  color: #8E8E8E;
  font-size: 20px;
  line-height: 23px;
`;
