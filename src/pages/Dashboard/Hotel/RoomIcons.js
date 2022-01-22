import { IoPersonSharp, IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { useEffect } from "react";

export default function RoomIcons({ maxOccupation, occupied, hotelId }) {
  const [arrIcons, setArrIcons] = useState([]);

  function renderIcons() {
    let newArr = [];
    for(let i = 0; i < maxOccupation; i++) {
      if(i < occupied) {
        newArr.push(1);
        continue;
      }
      newArr.push(0);
    }
    setArrIcons(newArr);
  }

  useEffect(() => renderIcons(), [hotelId]);
  console.log(arrIcons, "sflvfsfv");
  console.log(maxOccupation, occupied, "sfbsf");

  return(<>{arrIcons.map((icon) => icon === 0 ? <IoPersonOutline/> : <IoPersonSharp/>)}</>    
  );
}
