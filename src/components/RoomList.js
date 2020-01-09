import React from 'react'
import styled, { css } from 'styled-components';
import RoomCard from './RoomCard';
import { NaverMap, Marker } from 'react-naver-maps';
import { Redirect, Route, Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

const Container = styled.div`
  border-top: #f7941e 5px solid;
  width: 100%;

  @media (max-width: 576px) {
    border: none;
  }
`;

const ListSection = styled.div`
  width: 1132px;
  min-height: 950px;
  margin: 68px auto 84px auto;

  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const Title = styled.div`
  font-family: NanumSquare, serif;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #175c8e;
  text-align: left;
  margin-bottom: 21px;

  @media (max-width: 576px) {
    display: none;
  }
`;

const Contents = styled.div`
  width: 1132px;
  margin-top: 21px;
  padding-top: 18px;
  border-top: 2px solid #175c8e;
  display: flex;

  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
    border: none;
    margin: 0;
    padding: 0;
  }
`;

const MapWrapper = styled.div`
  border: 1px #d2dae2 solid;
  width: 752px;
  z-index: 0;

  @media (max-width: 576px) {
    width: 100%;
    border: none;
    height: 300px;
  }
`;

const ListCards = styled.div`
  margin-left: 13px;
  width: 363px;
  float: left;
  height: 878px;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 576px) {
    margin: 16px 16px 0 16px;
    width: calc(100% - 32px);
    height: 100%;
  }
`;

const StyledMarker = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  margin-left: -115px;
  
  border-radius: 50% 50% 50% 0;
  border: 4px solid #fff;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);

  &::after {
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    margin-left: -5px;
    margin-top: -5px;
    background-color: #fff;
  }

  &:hover {
    border: 4px solid red;
  }
`;
export default function RoomList({
  roomList,
  loading,
  marker,
  onMouseOverMarker,
  onMouseOutMarker,
  history
}) {
  const navermaps = window.naver.maps;
  const mapOptions = {
    maxZoom: 15,
    minZoom: 10,
    logoControl: false,
    zoomControl: true,
    scrollWheel: false,
    zoomControlOptions: {
      position: navermaps.Position.TOP_LIFT
    },
    draggable: true
  }
  // html element string은 이벤트인식을 못해서 글로벌 등록해줌
  // 잠시만 꼭 이렇게 해야하나? 그냥 StyledMarker에 애니메이션 달면 안되나?
  // 확인 즉시 애니메이션 달것.
  window.onMouseOutMarker = onMouseOutMarker;
  window.onMouseOverMarker = onMouseOverMarker;

  const setContentString = id => {
    let contentString = ReactDOMServer.renderToString(
      <StyledMarker>
      </StyledMarker>
    )
    const eventStr = ` onmouseover="onMouseOverMarker(${id})" onmouseout="onMouseOutMarker()"`;
    const lastIndex = contentString.lastIndexOf('"');
    contentString = contentString.substring(0, lastIndex + 1).concat(eventStr, "></div>")
    return contentString;
  }
  
  return (
    <Container>
      <ListSection>
        <Title>복덕방</Title>
        <Contents>
          <MapWrapper>
            <NaverMap
              style={{
                width: '100%',
                height: '100%'
              }}
              defaultCenter={{ lat: 36.764617, lng: 127.2831540 }}
              defaultZoom={11}
              {...mapOptions}
            >
              {roomList.map(room => (
                <Marker
                  key={room.id}
                  position={{ lat: room.latitude, lng: room.longitude }}
                  title={room.name}
                  animation={(marker.isActive && marker.id === room.id) ? navermaps.Animation.BOUNCE : null}
                  icon={{
                    content: setContentString(room.id)
                  }}
                  onClick={() => history.push(`/room/${room.id}`)}
                />
              ))}
            </NaverMap>
          </MapWrapper>
          <ListCards>
            {roomList.map(room => (
              <RoomCard
                key={room.id}
                room={room}
              />
            ))}
          </ListCards>
        </Contents>
        
      </ListSection>
    </Container>
  )
}