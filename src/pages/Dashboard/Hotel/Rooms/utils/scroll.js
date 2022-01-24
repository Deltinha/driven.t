function scrollToRooms(element) {
  scrollTo(element?.parentNode, 400);
}
  
function scrollToEnd(element) {
  scrollTo(element?.parentNode, element.scrollHeight + 200);
}
  
function scrollTo(element, position) {
  const config = {
    behavior: "smooth",
    top: position,
  };
  
  element?.scrollTo(config);
}
  
export { scrollToEnd, scrollToRooms };
