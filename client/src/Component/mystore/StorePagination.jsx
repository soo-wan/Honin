import React, { useEffect, useState } from "react";
import s from "../style/mystore/storePagination.module.css";
import { useRecoilState } from "recoil";
import { paginationState } from "./recoil/paginationState";

function StorePagination() {
  // 검색 결과로 return 받은 pagination 객체
  const [pagination, setPagination] = useRecoilState(paginationState);
  // 하단의 페이지 버튼을 반복문으로 생성하기 위한 배열
  const [pageArray, setPageArray] = useState([]);
  // 이전,다음 페이지 버튼의 스타일 변경을 위한 변수
  const [prevPageBtnStyle, setPrevPageBtnStyle] = useState(`${s.prev_btn}`);
  const [nextPageBtnStyle, setNextPageBtnStyle] = useState(`${s.next_btn}`);

  // pagination 객체가 변할때마다(검색결과가 달라질때) 렌더링
  useEffect(() => {
    // 현재 페이지에 따라 이전, 다음 페이지 버튼의 스타일을 변경
    if (!pagination.hasPrevPage) {
      setPrevPageBtnStyle(`${s.prev_btn} ${s.disabled_btn}`);
    } else {
      setPrevPageBtnStyle(`${s.prev_btn}`);
    }
    if (!pagination.hasNextPage) {
      setNextPageBtnStyle(`${s.next_btn} ${s.disabled_btn}`);
    } else {
      setNextPageBtnStyle(`${s.next_btn}`);
    }

    // 페이지 버튼 생성을 위한 배열
    const pageArr = [];
    for (let i = 0; i < pagination.last; i++) {
      pageArr.push(i + 1);
    }
    setPageArray(pageArr);
  }, [pagination]);

  return (
    <div className={s.pagination_container}>
      <button
        className={prevPageBtnStyle}
        onClick={() => pagination.prevPage()}
      >
        이전
      </button>
      <div className={s.page_btn_box}>
        {pageArray.map((page, idx) => {
          return (
            <button
              className={pagination.current === page ? s.current_page : ""}
              onClick={() => {
                pagination.gotoPage(page);
              }}
              key={idx}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className={nextPageBtnStyle}
        onClick={() => pagination.nextPage()}
      >
        다음
      </button>
    </div>
  );
}

export default StorePagination;
