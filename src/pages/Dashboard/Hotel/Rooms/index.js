import { useRef } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../../../components/Form/Button";
import useApi from "../../../../hooks/useApi";

import Room from "./Room";

import { scrollToEnd, scrollToRooms } from "./utils/scroll";

export default function Rooms({ hotelId, fetchReservation }) {
  const [rooms, setRooms] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const { hotel } = useApi();
  const roomsListRef = useRef();

  useEffect(() => {
    if (hotelId === null) return;
    setSelectedRoomId(null);

    fetchRooms(hotelId);
    const fetchRoomsIntervalId = setInterval(() => {
      fetchRooms(hotelId);
    }, 3000);

    return () => clearInterval(fetchRoomsIntervalId);
  }, [hotelId]);

  useEffect(() => {
    if (selectedRoomId === null) {
      scrollToRooms(roomsListRef.current);
      return;
    }

    scrollToEnd(roomsListRef.current);
  }, [rooms, selectedRoomId]);

  if (hotelId === null) return null;

  return (
    <>
      <Title>Ótima pedida! Agora escolha seu quarto</Title>
      <RoomsList ref={roomsListRef}>
        {rooms?.map(({ id, number, maxOccupation, currentOccupation }) => (
          <Room
            id={id}
            key={id}
            number={number}
            maxOccupation={maxOccupation}
            currentOccupation={currentOccupation}
            isSelected={id === selectedRoomId}
            selectRoom={() => setSelectedRoomId(id)}
          />
        ))}
      </RoomsList>
      {selectedRoomId && (
        <Button
          onClick={() =>
            hotel.saveReservation(selectedRoomId).then(() => fetchReservation())
          }
        >
          RESERVAR QUARTO
        </Button>
      )}
    </>
  );

  function fetchRooms(hotelId) {
    hotel.listRooms(hotelId).then((r) => {
      setRooms(r.data);
    });
  }
}

const RoomsList = styled.ul`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const Title = styled.p`
  color: #8e8e8e;
  font-size: 20px;
  margin: 36px 0;
`;
