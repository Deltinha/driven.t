import styled from "styled-components";

export default function Local({ locals }) {
  return (
    <Container>
      {locals?.map((local) => <Name>{local.name}</Name>)}
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 15px;
`;

const Name = styled.h3`
    font-size: 17px;
    color: #7b7b7b;
    text-align: center;
`;
