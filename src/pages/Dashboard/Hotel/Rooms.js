import styled from "styled-components";
import RoomIcons from "./RoomIcons";

export default function Rooms({ setSelectedRoom, selectedRoom, room, bookedRoom }) {
  function selectARoom() {
    setSelectedRoom(room.id);
  }
  
  return(
    <Room onClick={() => selectARoom()} selectedRoom={selectedRoom === room.id} disabled = {room.max_occupation === room.occupied}>{room.number} 
      <RoomOccupation >
        <RoomIcons maxOccupation = {room.max_occupation} occupied = {room.occupied} hotelId = {room.hotelId} selectedRoom = {selectedRoom} room ={room} bookedRoom={bookedRoom}/>
      </RoomOccupation>
    </Room>
  );
}

const RoomOccupation = styled.div`
`;

const Room = styled.button`
  cursor: pointer;
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  box-sizing: border-box;
  background-color: ${(props) => props.selectedRoom ? "#FFEED2" : ""};
  border-radius: 10px;
  margin:  0 8px 16px 8px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  outline: none;
`;
