import React, { useCallback } from 'react'
import styled from 'styled-components';
import MyTimeTable from './MyTimeTable';
import { useDispatch } from 'react-redux';
import { updateSheetType } from '../../modules/timetable';

const Container = styled.div`

`;

export default function MobileMyTimeTable({
  myLectures,
  totalSemesters,
  selectedSemester,
  layout,
  isOpen,
  selectedLayout,
  initStateBySemester
}) {
  const dispatch = useDispatch();

  const selectLectureFromMyTable = useCallback((x, y) => {
    let id = -1, lecture = null;
    for (let value of layout) {
      if (x === value.start.x && (y >= value.start.y && y <= value.end.y)) {
        id = value.id;
      }
    }
    for (let lec of myLectures) {
      if (id === `${lec.code}${lec.lecture_class}` || id === lec.id) {
        lecture = lec;
      }
    }

    if (id === -1) {
      dispatch(updateSheetType({
        flag: false,
        lecture: {}
      }));
    } else {
      dispatch(updateSheetType({
        flag: true,
        lecture
      }));
    }
  }, [dispatch, layout, myLectures]);

  return (
    <Container>
      <MyTimeTable
        totalSemesters={totalSemesters}
        selectedSemester={selectedSemester}
        selectedLayout={selectedLayout}
        layout={layout}
        initStateBySemester={initStateBySemester}
        mobile={true}
        isOpen={isOpen}
        selectLectureFromMyTable={selectLectureFromMyTable}
      />
    </Container>
  )
}