import React, { useState, useEffect, useRef } from 'react';
import PromotionEdit from '../../components/PromotionComponents/PromotionEdit';
import { useDispatch, useSelector } from 'react-redux';
import {registerPromotion, getPromotion, checkMyPendingPromotion, getMyStore} from '../../modules/promotion';
import { useToasts } from 'react-toast-notifications';
import { marketAPI } from '../../api'
import Header from '../../components/BoardComponents/Header';
import ButtonGroup from '../../components/BoardComponents/ButtonGroup';

export default function PromotionEditContainer({ history, match }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { data, error, post, myStore } = useSelector(state => state.promotionReducer);
  const [helpButtontonFlag, setHelpButtonFlag] = useState(false);
  const [shops, setShops] = useState([]);
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const [promotion, setPromotion] = useState({
    title: '',
    summary: '',
    content: '',
    start: '',
    end: '',
    shop: '',
    nickname: ''
  });
  const editorRef = useRef();
  const modules = {
    toolbar: {
      container: [
        [{'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'color': []}, {'background':[]}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['image', 'video']
      ]
    }
  }

  const onChangeItem = e => {
    const target = e.target;
    if (target) {
      setPromotion(promotion =>({
        ...promotion,
        [target.name]: target.value
      }));
    } else {
      setPromotion(promotion =>({
        ...promotion,
        content: e
      }));
    }
  }

  const onClickHelpButton = e => {
    e.stopPropagation();
    setHelpButtonFlag(value => !value)
  };

  const onClickRegisterButton = () => {
    console.log('작성 버튼 클릭');
    const {title, content, summary, start, end, shop } = promotion;
    if (title === "" || content === "") {
      addToast('제목과 내용을 채워주세요', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (title.length > 20) {
      addToast(`제목 길이는 최대 20자 입니다. 지금 제목의 길이는 ${title.length}자 입니다.`, {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if (summary.length > 50) {
      addToast(`홍보 문구 길이는 최대 50자 입니다. 지금 제목의 길이는 ${summary.length}자 입니다.`, {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }
    if(!dateRegex.test(start) || !dateRegex.test(end)) {
      addToast('날짜는 형식에 맞춰 적어주세요. 예시)2020-01-01', {
        appearance: 'warning',
        autoDismiss: true
      })
    }
    if (promotion.shop === "") {
      addToast('홍보할 상점을 선택해주세요.', {
        appearance: 'warning',
        autoDismiss: true
      });
      return;
    }

    const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).getTime();
    const startDate = new Date(start);
    const startTime = startDate.getTime();
    startDate.setMonth(startDate.getMonth() + 1);
    const limitTime = startDate.getTime();
    const endTime = (new Date(end)).getTime();
    if (endTime <= startTime) {
      addToast('시작 일자는 종료 일자보다 앞서야 합니다.', {
        appearance: 'warning',
        autoDismiss: true
      })
      return;
    }
    if (endTime >= limitTime) {
      addToast('최대 홍보 기간은 한 달입니다.', {
        appearance: 'warning',
        autoDismiss: true
      })
      return;
    }
    if (endTime <= today) {
      addToast('종료 일자는 오늘 이후여야 합니다.', {
        appearance: 'warning',
        autoDismiss: true
      })
      return;
    }
    const link = content.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,256}\b(\/?[-a-zA-Z0-9@:;|_\+.~#%?&//=]*)?/gi)

    dispatch(registerPromotion({
      body: {
        title,
        event_title: summary,
        content,
        start_date: start,
        end_date: end,
        shop_id: Number(shop),
        thumbnail: link ? link.find(
          value => value.indexOf('static.koreatech') !== -1 &&
            (value.indexOf('.png') !== -1 || value.indexOf('.jpg') !== -1 || value.indexOf('.jpeg') !== -1 ||
              value.indexOf('.gif') !== -1 || value.indexOf('.bmp') !== -1 || value.indexOf('.raw') !== -1 || value.indexOf('.svg') !== -1 ||
              value.indexOf('.PNG') !== -1 || value.indexOf('.JPG') !== -1 || value.indexOf('.JPEG') !== -1 ||
              value.indexOf('.GIF') !== -1 || value.indexOf('.BMP') !== -1 || value.indexOf('.RAW') !== -1 || value.indexOf('.SVG') !== -1)
        ) : undefined
      },
      token: sessionStorage.getItem("token")
    }))
  };

  const onClickCancelButton = () => {
    history.goBack();
  };


  function imageUpload ()  {
    const _this = this;
    const editor = editorRef.current;
    let formData = new FormData();
    let fileInput = document.createElement('input');
    const range = editor.getEditor().getSelection();

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('style', 'display: none');
    fileInput.setAttribute('accept', 'image/*');

    fileInput.addEventListener('change', async () => {
      formData.append('image', fileInput.files[0]);
      try {
        const result = await marketAPI.uploadImage(sessionStorage.getItem("token"), formData)
        _this.quill.insertEmbed(range.index, 'image', result.data.url[0]);
      } catch(e) {
        addToast("이미지의 크기가 너무 큽니다.", {
          appearance: 'error',
          autoDismiss: true
        });
      }
    });
    fileInput.click();
  }

  useEffect(() => {
    if(!(sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo")).identity === 5)) {
      console.log(sessionStorage.getItem("userInfo").identity)
      history.goBack();
      alert("점주만이 홍보 게시글을 작성할 수 있습니다");
      return;
    }
    if(sessionStorage.getItem("token")) {
      dispatch(checkMyPendingPromotion({
        token: sessionStorage.getItem("token")
      }))
      dispatch(getMyStore({
        token: sessionStorage.getItem("token")
      }))

      const today = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000);
      const startDate = today.toISOString().slice(0, 10);
      today.setDate(today.getDate() + 3);
      const endDate = today.toISOString().slice(0, 10);
      setPromotion(promoiton => ({
        ...promoiton,
        start: startDate,
        end: endDate,
        nickname: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem("userInfo")).nickname : ""
      }));
    }
    window.addEventListener('click' , () => {
      setHelpButtonFlag(false)
    })

    return () => {
      console.log("out")
      window.removeEventListener('click' , () => {
        setHelpButtonFlag(false)
      })
    }
  }, []);

  useEffect(() => {
    if (data) {
      if (data.status === 201) {
        addToast("게시글을 등록했습니다", {
          appearance: 'success',
          autoDismiss: true
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      addToast("게시글 등록 중 에러가 발생했습니다.", {
        appearance: 'error',
        autoDismiss: true
      });
    }
  }, [error]);

  useEffect(() => {
    if (post.pendingData) {
      if (post.pendingData.id) {
        if (window.confirm('현재 진행중인 이벤트가 있습니다.\n수정하시겠습니까?')) {
          sessionStorage.setItem("postId", post.pendingData.id);
          history.replace('/board/promotion/edit');
        } else {
          history.goBack();
        }
      }
    }
    if (post.error) {
      addToast("게시글 체크 중 에러가 발생했습니다.", {
        appearance: 'error',
        autoDismiss: true
      });
    }
  }, [post]);

  useEffect(() => {
    if(myStore.data) {
      const firstShop = myStore.data[0];
      setPromotion(promotion => ({
        ...promotion,
        shop: firstShop ? String(firstShop.shop_id) : ""
      }))
      setShops(myStore.data)
    }
    if(myStore.error) {
      addToast("내 상점을 불러오는 중 에러가 발생했습니다.", {
        appearance: 'error',
        autoDismiss: true
      });
    }
  }, [myStore]);

  return (
    <>
      <Header
        match={match}
        history={history}>
        <ButtonGroup
          match={match}
          history={history}
        />
      </Header>
      <PromotionEdit
        type="등록"
        promotion={promotion}
        shops={shops}
        helpButtonFlag={helpButtontonFlag}
        editorRef={editorRef}
        modules={modules}
        match={match}
        imageUpload={imageUpload}
        onChangeItem={onChangeItem}
        onClickHelpButton={onClickHelpButton}
        onClickEditButton={onClickRegisterButton}
        onClickCancelButton={onClickCancelButton} />
    </>
  )
}