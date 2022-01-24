import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import useApi from "../../../hooks/useApi";
import ForbidText from "../../../components/ForbidText";
import Rooms from "./Rooms";
import SelectionOverview from "./SelectionOverview";

export default function Hotel() {
  const [ticketInfo, setTicketInfo] = useState({});
  const { ticket, hotel } = useApi();
  const [ hotels, setHotels ] = useState([]);
  const [ selectedHotel, setSelectedHotel ] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [ selectedRoom, setSelectedRoom ] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [bookedRoom, setBookedRoom] = useState(false);

  function getBooking() {
    hotel.getBooking()
      .then(res =>
        setBookingInfo(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    ticket.getTicketFromUser()
      .then(res => 
        setTicketInfo(res.data))
      .catch(err => console.error(err));
    getBooking();
    hotel.listAll()
      .then(res => 
        setHotels(res.data)) 
      .catch(err => console.log(err));
  }, [isEditing]);

  function selectAHotel(id) {
    setSelectedHotel(id);
    hotel.listRooms(id)
      .then(res => 
        setRooms(res.data))
      .catch(err => console.log(err)); 
  }

  function bookARoom(id) {
    hotel.saveBooking(id)
      .then(() => getBooking())
      .catch(err => console.log(err));
    setIsEditing(false);
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {
        Object.keys(ticketInfo).length === 0 ?
          <ForbidText>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</ForbidText>
          : !ticketInfo.hasHotel ?
            <ForbidText>Sua modalidade de ingresso não inclui hospedagem
              <br/>Prossiga para a escolha de atividades</ForbidText>
            : Object.keys(bookingInfo).length === 0 || isEditing ?
              (<><ContainerHotels>{hotels?.map((hotel) => 
                <HotelOption
                  id={hotel.id}
                  image={hotel.image}
                  selectedHotel={selectedHotel}
                  onClick={() => selectAHotel(hotel.id)}
                >
                  <div className="image"></div>
                  <p className="title">{hotel.name}</p>
                  <p className="subtitles">Tipos de acomodação:</p>
                  <HotelTypes>{hotel.hotelTypes.map((type, i) => <p className="values">{type}{i === 0 ? " e" : ""}</p>)}</HotelTypes>                
                  <p className="subtitles">Vagas disponíveis:</p>
                  <p className="values">{hotel.vacancies}</p>
                </HotelOption>
              )}</ContainerHotels>   
              {rooms.length > 0 ? <RoomMessage>Ótima pedida! Agora escolha seu quarto</RoomMessage> : ""}           
              <ContainerRooms>                
                {rooms?.map((room) => <Rooms selectedRoom = {selectedRoom} setSelectedRoom = {setSelectedRoom} room = {room} bookedRoom={bookedRoom}/> )}
              </ContainerRooms>{rooms.length > 0 ? <ChangeRooms onClick={() => bookARoom(selectedRoom)}>RESERVAR QUARTO</ChangeRooms> : ""}</>)              
              :  <SelectionOverview booking={bookingInfo} HotelOption={HotelOption} setIsEditing={setIsEditing} setBookedRoom={setBookedRoom} setSelectedRoom = {setSelectedRoom} selectedRoom ={selectedRoom}/>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ContainerHotels = styled.div`
display: flex;
`;

const HotelOption = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${(props) =>
    props.selectedHotel === props.id ? "#FFEED2" : "#f1f1f1"};
  margin: 10px 10px;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  .image {
    height: 109px;
    width: 168px;
    border-radius: 5px;
    background: url(${({ image }) => image});
    background-size: cover;
  }
  .title {
    color: #343434;
    font-size: 16px;
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
    margin-right: 5px;
  }
`;

const HotelTypes = styled.div`
  display: flex;
`;

const RoomMessage = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #8E8E8E;
  margin: 25px 12px;
`;

const ContainerRooms = styled.div`
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
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
