import styled from "styled-components";

export default function DaysButton({ weekday }) {
  return (
    <Button>
      {weekday.name}, {weekday.date}
    </Button>
  );
}

const Button = styled.button`
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: 0;
  width: 131px;
  height: 37px;
  cursor: pointer;
`;
