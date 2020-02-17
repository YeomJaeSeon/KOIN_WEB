import React from "react";
import styled from "styled-components";
import Pagination from "./SharedComponents/Pagination";
import {Link} from "react-router-dom";

const Main = styled.div`
  width: 100%;
  border-top: #f7941e 5px solid;
  
  @media (max-width: 576px) {
    border-top: none;
  }
`;

const Container = styled.div`
  margin-top: 61px;
  width: 1132px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-top: 0;
  }
`;

const List = styled.div`
  width: 100%;
  float: left;
  margin-right: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

const HeadTitle = styled.div`
  float: left;
  font-size: 30px;
  letter-spacing: -1.5px;
  font-weight: 800;
  color: #175c8e;
  font-family: "NanumSquare", serif;
  margin-bottom: 20px;
  cursor: pointer;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const WriteBtn = styled.button`
  float: right;
  padding: 6px 20px;
  color: white;
  background-color: #175c8e;
  font-size: 13px;
  cursor: pointer;
  letter-spacing: -0.7px;
  border: 1px solid #175c8e;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const Table = styled.table`
  border-top: 2px #175c8e solid;
  border-bottom: 2px #175c8e solid;
  border-collapse: collapse;
  font-size: 13px;
  letter-spacing: -0.8px;
  table-layout: fixed;
  width:100%;
  margin-bottom: 22px;
  
  @media (max-width: 576px) {
    border: none;
    
    thead {
      display: none;
    }

    tbody td {
      display: none;
    }
  }
  
  thead tr {
    height: 44px;
    font-size: 13px;
  }
  
  thead tr th {
    border-bottom: 1px #175c8e solid;
    font-size: 15px;
    letter-spacing: -0.6px;
    color: #175c8e
  }
  
  thead tr :first-child {
    width: 84px;
  }
  
  thead tr :nth-child(2) {
    width: 84px;
  }
  
  thead tr :nth-child(3) {
    width: 489px;
  }
  
  thead tr :nth-child(4) {
    width: 147px;
  }
  
  thead tr :nth-child(5) {
    width: 140px;
  }
  
  thead tr :nth-child(6) {
    width: 68px;
  }
  
  thead tr :last-child {
    width: 106px;
  }
  
  tbody tr {
    height: 68px;
    cursor: pointer;
    border-bottom: 1px #d2dae2 solid;
    
    @media (max-width: 576px) {
      height: 90px;
      border-bottom: none;
    }
  }
  
  tr:hover td {
    background: #f8fafb;
  }
`;

const Id = styled.td`
  font-size: 13px;
  width: 84px;
`;

const Category = styled.td`
  width: 84px;
`;

const Title = styled.td`
  width: 489px;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const CommentCount = styled.span`
  position: relative;
  bottom: 1px;
  font-size: 12px;
  color: #175c8e;
  letter-spacing: -0.6px;
`;

const Nickname = styled.td`
  width: 147px;
  color: #175c8e;
`;

const LostDate = styled.td`
  width: 140px;
`;

const Date = styled.td`
  width: 68px;
`;

const Hit = styled.td`
  width: 106px;
`;

const MobileList = styled.div`
  display: none;
  
  @media(max-width: 576px){
    display: block;
    padding: 16px 16px 14.5px 16px;
    border-bottom: 1px solid #ececec;
  }
`;

const MobileTitle = styled.div`
  display: block;
  text-align: left;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  letter-spacing: -0.8px;
  line-height: 1.5;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.87);
`;

const MobileCommentCount = styled.span`
  color: #175c8e;
`;

const MobileInfo = styled.div`
  display: block;
  text-align: left;
`;

const MobileMiddleInfo = styled.span`
  font-size: 13px;
  font-weight: normal;
  line-height: 1.54;
  letter-spacing: -0.7px;
  color: #a1a1a1;
`;

const MobileDate = styled.span`
  float: right;
  font-size: 13px;
  font-weight: 300;
  line-height: 1.54;
  letter-spacing: -0.7px;
  color: #a1a1a1;
`;

const MobileLostDate = styled.div`
  display: block;
  text-align: left;
  font-size: 13px;
  font-weight: normal;
  line-height: 1.54;
  letter-spacing: -0.7px;
  color: #a1a1a1;
`;

const MobileWrite = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/mobile__create.png"
})`
  display: none;
  
  @media(max-width: 576px){
    display: block;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  @media (max-width: 360px) {
    left: 312px;
  }
`;

export default function LostItemList(
  {
    lostItems,
    totalPageNum,
    setPageData,
    history,
    path
  }
) {
  function goRegister() {
    if(sessionStorage.getItem('userInfo')){
      history.push('/lost/register');
    }
    else {
      if(window.confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')){
        history.push('/login');
      }
    }
  }
  return (
    <Main>
      <Container>
        <List>
          <div>
            <HeadTitle>
              분실물
            </HeadTitle>
            <Link to={'/lost/register'}>
              <WriteBtn>
                글쓰기
              </WriteBtn>
            </Link>
          </div>
          <Table>
            <thead>
            <tr>
              <th>번호</th>
              <th>분류</th>
              <th>제목</th>
              <th>작성자</th>
              <th>분실 및 습득일</th>
              <th>날짜</th>
              <th>조회수</th>
            </tr>
            </thead>
            <tbody>
            {lostItems.map((items, id) => {
              return (
                <tr
                  key={id}
                  onClick={()=>history.push(`/lost/detail/${items.id}`)}>
                  <Id>
                    {items.id}
                  </Id>
                  <Category>
                    {items.type === 0 &&
                    "분실물 습득"
                    }
                    {items.type === 1 &&
                    "분실물 찾기"
                    }
                  </Category>
                  <Title>
                    {items.title}
                    <CommentCount>
                      {items.comment_count !== 0 &&
                      " [" + items.comment_count + "]"
                      }
                    </CommentCount>
                  </Title>
                  <Nickname>
                    {items.nickname}
                  </Nickname>
                  <LostDate>
                    {items.date}
                  </LostDate>
                  <Date>
                    {items.created_at.slice(0, 10).replace('-', '.').replace('-', '.')}
                  </Date>
                  <Hit>
                    {items.hit}
                  </Hit>
                  <MobileList>
                    <MobileTitle>
                      <span>{items.title}</span>
                      <MobileCommentCount>
                        {items.comment_count !== 0 &&
                        " (" + items.comment_count + ")"
                        }
                      </MobileCommentCount>
                    </MobileTitle>
                    <MobileInfo>
                      <MobileMiddleInfo>조회 {items.hit} · </MobileMiddleInfo>
                      <MobileMiddleInfo>{items.nickname === undefined ? items.author : items.nickname}</MobileMiddleInfo>
                      <MobileDate>{items.created_at.slice(0, 10).replace('-', '.').replace('-', '.')}</MobileDate>
                    </MobileInfo>
                    <MobileLostDate>{items.type === 0 ? '습득일' : '분실일'}&nbsp;{items.date}</MobileLostDate>
                  </MobileList>
                </tr>
              )
            })}
            </tbody>
          </Table>
          <Pagination
            totalPageNum={totalPageNum}
            setPageData={setPageData}
            isWriteBtn={true}
            writeBtnLink={'/lost/register'}
            path={path}/>
          <MobileWrite onClick={() => goRegister()}/>
        </List>
      </Container>
    </Main>
  )
}