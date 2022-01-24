import styled from "styled-components";

export default function TextSection({ title, content }) {
  return (
    <>
      <TextSectionTitle>{title}</TextSectionTitle>
      <TextSectionContent>{content}</TextSectionContent>
    </>
  );
}

const TextSectionTitle = styled.p`
  font-size: 12px;
  color: #3c3c3c;
  font-weight: bold;
  margin-top: 10px;
`;

const TextSectionContent = styled.p`
  font-size: 12px;
  color: #3c3c3c;
  margin-top: 5px;
`;
