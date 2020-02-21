import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  position: relative;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Title = styled.div`
  float: left;
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #175c8e;
  cursor: pointer;
`;

export default React.memo(function Header({
  match,
  children
}) {
  const setTitle = () => {
    if (match.params.type === 'sell') {
      sessionStorage.setItem("marketId", 0);
      return '팝니다';
    } else {
      sessionStorage.setItem("marketId", 1);
      return '삽니다';
    }
  }
  return (
    <Container>
      <Title>{setTitle()}</Title>
      {children}
    </Container>
  )
});