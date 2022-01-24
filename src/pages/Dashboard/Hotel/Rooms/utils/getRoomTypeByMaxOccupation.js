export function getRoomTypeByMaxOcuppation(maxOccupation) {
  const roomClassifications = ["Single", "Double", "Triple"];
  
  return roomClassifications[maxOccupation - 1];
}
