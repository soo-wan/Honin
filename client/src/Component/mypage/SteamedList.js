import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import s from "../style/mypage/steamedlist.module.css";
import "../style/reset.css";
import jaxios from "../util/jwtUtil";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";

function SteamedList() {
  const navigate = useNavigate();
  const [secondhandLikeList, setSecondhandLikeList] = useState([]);
  const [paging, setPaging] = useState({});
  const lUser = useSelector((state) => state.user);
  const [isRefresh, setIsRefresh] = useState(true);
  //const [isLike, setIsLike] = useState(false);

  // 내 좋아요 리스트(중고)
  useEffect(() => {
    jaxios
      .get(`/api/mypage/getSecondhandLikeList/1/${lUser.nickname}`)
      .then((result) => {
        // console.log(result.data.secondhandLikeList[0].fname);
        setSecondhandLikeList(result.data.secondhandLikeList);
        setPaging(result.data.paging);
      })
      .catch((err) => console.error(err));
  }, [isRefresh]);

  function SecondhandView(num) {
    window.scrollTo(0, 0);
    navigate(`/secondhandView/${num}`);
  }

  async function reFresh() {
    setIsRefresh(!isRefresh);
  }

  async function deleteLike(snum, nickname) {
    try {
      if (window.confirm("찜 목록에서 삭제하시겠습니까?")) {
        jaxios.post(`/api/secondhand/unlikePost`, {
          snum: snum,
          likenick: nickname,
        });
        await reFresh();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header></Header>
      <div className={s.container}>
        <SideMenu></SideMenu>
        <div className={s.steamedListContainer}>
          <header className={s.header}>
            <h1>중고 거래 찜 목록</h1>
            <div className={s.tabs}></div>
            <div>
              <span className={s.likesIconTop}>❤️ 클릭시 찜 삭제</span>
            </div>
          </header>

          <ul className={s.itemList}>
            {secondhandLikeList.map((sl, idx) => {
              // images 컬럼을 JSON.parse로 변환 후 배열로 처리
              const imagesArray = JSON.parse(sl.images);
              const firstImage = imagesArray.length > 0 ? imagesArray[0] : null;

              return (
                <li key={idx} className={s.item}>
                  <div
                    className={s.leftItem}
                    onClick={() => SecondhandView(sl.snum)}
                  >
                    <div className={s.itemImageWrapper}>
                      {firstImage && (
                        <img
                          // src={`/api/uploads/secondhand/${secondhand.images[currentSlide]}`}
                          src={`${firstImage}`}
                          alt={sl.title}
                          className={s.itemImage}
                        />
                      )}
                    </div>
                    <div className={s.itemDetails}>
                      <h2 className={s.itemTitle}>
                        {sl.title} (
                        <span className={s.likesCount}>{sl.replycount}</span>)
                      </h2>
                      <p className={s.itemLocation}>{sl.address1}</p>
                      {/* <p className={s.itemPrice}>{sl.price}</p> */}
                      <p className={s.itemPrice}>
                        {sl.price.toLocaleString()}원
                      </p>
                      {sl.state === "Y" && (
                        <span className={`${s.transactionStatus} ${s.onsale}`}>
                          판매중
                        </span>
                      )}
                      {sl.state === "N" && (
                        <span className={s.transactionStatus}>판매완료</span>
                      )}
                    </div>
                  </div>

                  <div className={s.itemLikes}>
                    <span
                      className={s.likesIcon}
                      onClick={() => deleteLike(sl.snum, sl.nickname)}
                    >
                      ❤️
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SteamedList;
