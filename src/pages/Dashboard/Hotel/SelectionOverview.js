import styled from "styled-components";

export default function SelectionOverview({ booking }) {
  console.log(booking);
  return (<>
    <InfoText>
      Você já escolheu seu quarto:
    </InfoText>
    <div>
      <img src={booking.hotelImage}/>
    </div>
  </>);
}

const InfoText = styled.p`
  color: #8E8E8E;
  font-size: 20px;
  line-height: 23px;
`;
