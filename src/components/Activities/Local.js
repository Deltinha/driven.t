import styled from "styled-components";

import Activity from "./Activity";

export default function Local({ local, activities }) {
  return (
    <Container>
      <Name>{local.name}</Name>
      <ActivitiesList>
        {activities.map((activity, index) => 
          <Activity
            key={index}
            activityInfo={activity}
          />
        )}
      </ActivitiesList>
    </Container>
  );
}

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Name = styled.h3`
    font-size: 17px;
    color: #7b7b7b;
    text-align: center;
`;

const ActivitiesList = styled.ul`
    width: 100%;
    height: 93%;
    border: 1px solid #d7d7d7;
    border-left: 0px;
    padding: 10px;
    position: relative;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(119, 119, 119, 0.2);
        border-radius: 5px;
    }
`;
