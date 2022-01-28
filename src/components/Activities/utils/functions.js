import dayjs from "dayjs";

export function getWeekdayName(weekday) {
  switch (weekday) {
  case 0:
    return "Domingo";
  case 1:
    return "Segunda";
  case 2:
    return "Terça";
  case 3:
    return "Quarta";
  case 4: 
    return "Quinta";
  case 5:
    return "Sexta";
  case 6:
    return "Sábado";
  case 7:
    return "Domingo";
  default:  
    break;
  }
}

//format to DD/MM style. 
export function formatDate(date) {
  return `${dayjs(date).date()}/${dayjs(date).month() < 10 ? "0" + (dayjs(date).month()+1) : (dayjs(date).month()+1)}`;
}

export function removeDuplicatedObjectsFromArray(array, prop) {
  const hash = {};

  for (const item of array) {
    const date = item[prop];

    if (!hash[date]) {
      hash[date] = item;
    }
  }

  return Object.values(hash);
}
