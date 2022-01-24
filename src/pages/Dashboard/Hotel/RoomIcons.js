import { IoPersonSharp, IoPersonOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function RoomIcons({ maxOccupation, occupied, hotelId, selectedRoom, room, bookedRoom }) {
  const [arrIcons, setArrIcons] = useState([]);

  function renderIcons() {
    let isAdded = false;
    let newArr = [];
    for(let i = 0; i < maxOccupation-1; i++) {
      if(bookedRoom === room.id && selectedRoom === room.id && !isAdded) {
        newArr.push(2);
        isAdded = true;
        continue;
      }
      if(i < occupied) {
        newArr.push(1);
        continue;
      }
      newArr.push(0);
    }
    if(bookedRoom !== room.id && selectedRoom === room.id) {
      newArr.push(2);
      setArrIcons(newArr);
      return;
    }  
    if(maxOccupation === occupied) {
      newArr.push(1);
      setArrIcons(newArr);
      return;
    } 
    newArr.push(0);
    setArrIcons(newArr);
  }

  useEffect(() => renderIcons(), [hotelId, selectedRoom]);

  return(<>{arrIcons.map((icon, index) => icon === 0 ? 
    <IoPersonOutline index={index} size={20}/> : 
    icon === 1 ? <IoPersonSharp size={20}/> :
      <IoPersonSharp size={20} color={"#FF4791"}/>)}</>    
  );
}
