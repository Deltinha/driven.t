import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import useApi from "../../../hooks/useApi";
import ForbidText from "../../../components/ForbidText";
import Rooms from "./Rooms";

export default function Hotel() {
  const [ticketInfo, setTicketInfo] = useState({});
  const { ticket, hotel } = useApi();
  const [ hotels, setHotels ] = useState([]);
  const [ selectedHotel, setSelectedHotel ] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [ selectedRoom, setSelectedRoom ] = useState(false);

  useEffect(() => {
    ticket.getTicketFromUser()
      .then(res => 
        setTicketInfo(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    hotel.listAll()
      .then(res => 
        setHotels(res.data)) 
      .catch(err => console.log(err));
  }, []);

  console.log(hotels); // remover depois
  console.log(rooms); // remover depois

  function selectAHotel(id) {
    setSelectedHotel(id);
    hotel.listRooms(id)
      .then(res => 
        setRooms(res.data))
      .catch(err => console.log(err)); 
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {
        ticketInfo.hasHotel ?
          <HotelOption>COMPONENTE SELECT HOTEL AQUI</HotelOption> 
          : Object.keys(ticketInfo).length === 0 ?
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
            <ContainerRooms>
              {rooms?.map((room) => <Rooms selectedRoom = {selectedRoom} setSelectedRoom = {setSelectedRoom} room = {room}/> )}
            </ContainerRooms></>)
            : ticketInfo.hasHotel ?
              <span>HOTEL COMPONENT AQUI</span>
              : <ForbidText>Sua modalidade de ingresso não inclui hospedagem
                <br/>Prossiga para a escolha de atividades</ForbidText>
      }
    </>
  );
}

/*
 <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {
        ticketInfo.hasHotel ?
          <span>COMPONENTE SELECT HOTEL AQUI</span> 
          : Object.keys(ticketInfo).length === 0 ?
            <ForbidText>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</ForbidText>
            : ticketInfo.hasHotel ?
              <span>HOTEL COMPONENT AQUI</span>
              : <ForbidText>Sua modalidade de ingresso não inclui hospedagem
                <br/>Prossiga para a escolha de atividades</ForbidText>
      }
    </>
*/

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

const ContainerRooms = styled.div`
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

/*
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
*/
