import { IoPersonSharp, IoPersonOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function RoomIcons({ maxOccupation, occupied, hotelId, selectedRoom, room }) {
  const [arrIcons, setArrIcons] = useState([]);

  function renderIcons() {
    let newArr = [];
    for(let i = 0; i < maxOccupation - 1; i++) {
      if(i < occupied) {
        newArr.push(1);
        continue;
      }
      newArr.push(0);
    }
    if(selectedRoom === room.id) {
      newArr.push(2);
      setArrIcons(newArr);
      return;
    }  
    if( maxOccupation === occupied) {
      newArr.push(1);
      setArrIcons(newArr);
      return;
    } 
    newArr.push(0);
    setArrIcons(newArr);
  }

  useEffect(() => renderIcons(), [hotelId, selectedRoom]);

  return(<>{arrIcons.map((icon) => icon === 0 ? 
    <IoPersonOutline size={20}/> : 
    icon === 1 ? <IoPersonSharp size={20}/> : 
      <IoPersonSharp size={20} color={"#FF4791"}/>)}</>    
  );
}
