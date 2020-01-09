import React, { useEffect } from 'react'
import RoomList from '../components/RoomList';
import { useSelector, useDispatch } from 'react-redux';
import { getRoomList } from '../modules/room';

export default function RoomListContainer({ history }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.roomReducer.rooms);

  useEffect(() => {
    dispatch(getRoomList());
  }, [dispatch]);

  return (
    <RoomList
      roomList={data}
      loading={loading}
      history={history}
    />
  )
}
