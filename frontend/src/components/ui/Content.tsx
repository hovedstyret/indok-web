import styled from "styled-components";

interface ContentProps {
  children: string | JSX.Element | JSX.Element[];
}

const Content: React.FC<ContentProps> = (props) => {
  return <StyledContent>{props.children}</StyledContent>;
};

const StyledContent = styled.div`
  max-width: ${({ theme }) => theme.contentWidth};
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
`;

export default Content;
