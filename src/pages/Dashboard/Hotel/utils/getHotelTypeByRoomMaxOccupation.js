export function getHotelTypeByRoomMaxOcuppation(roomMaxOccupation) {
  const roomClassifications = ["Single", "Double", "Triple"];
  const result = roomClassifications.filter(
    (r, i) => i <= roomMaxOccupation - 1
  );
  return result.join(", ");
}
