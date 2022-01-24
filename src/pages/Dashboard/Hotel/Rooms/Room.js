import styled from "styled-components";
import getVacancyIcons from "./utils/getVacancyIcons";

export default function Room({
  id,
  number,
  maxOccupation,
  currentOccupation,
  isSelected,
  selectRoom,
}) {
  const args = { RoomId: id, maxOccupation, currentOccupation, isSelected };
  const isFull = maxOccupation === currentOccupation;

  return (
    <li>
      <RoomButton
        onClick={selectRoom}
        isSelected={isSelected}
        disabled={isFull}
      >
        {number}
        <div> {getVacancyIcons(args)}</div>
      </RoomButton>
    </li>
  );
}

const RoomButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #454545;
  background-color: ${({ isSelected }) => (isSelected ? "#FFEED2" : "#fff")};
  height: 45px;
  width: 190px;
  border: 1px solid #cecece;
  border-radius: 10px;
  padding: 11px 16px;
  padding-right: 13px;
  margin-bottom: 8px;
  margin-right: 17px;
  svg {
    width: 27px;
    height: 27px;
    fill: #000;
    margin-top: 5px;
  }
  svg#selected {
    fill: #ff4791;
  }
  :disabled {
    color: #9d9d9d;
    background-color: #e9e9e9;
    svg {
      fill: #8c8c8c;
    }
  }
`;
