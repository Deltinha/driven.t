import {
  BsPerson as VacancyIcon,
  BsFillPersonFill as NoVacancyIcon,
} from "react-icons/bs";
  
export default function getVacancyIcons({
  roomId,
  maxOccupation,
  currentOccupation,
  isSelected,
}) {
  const result = [];
  
  for (let i = maxOccupation; i > 0; i--) {
    const key = `icon-${i}-room-${roomId}`;
  
    if (i <= currentOccupation) {
      result.push(<NoVacancyIcon key={key} />);
    } else {
      if (isSelected && i === currentOccupation + 1) {
        result.push(<NoVacancyIcon id="selected" key={key} />);
      } else {
        result.push(<VacancyIcon key={key} />);
      }
    }
  }
  
  return result;
}
