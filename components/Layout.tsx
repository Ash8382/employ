import styled from "styled-components";
import { ReactNode } from "react";

const Wrapper = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}
