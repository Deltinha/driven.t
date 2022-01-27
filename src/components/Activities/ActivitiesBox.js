import styled from "styled-components";

const ActivitiesBox = styled.div`
    width: 100%;
    height: 70%;
    display: grid;
    grid-template-columns: repeat(3 , 33.33%);

    & div:first-child {
        ul {
            border-left: 1px solid #d7d7d7;
        }
    }
`;

export default ActivitiesBox;
