import React from "react";
import s from "../style/mystore/aroundStore.module.css";
import { useRecoilState } from "recoil";
import { searchResultData } from "./recoil/searchState";
import StoreList from "./StoreList";
import StorePagination from "./StorePagination";

function AroundStore({ map }) {
  const [searchData, setSearchData] = useRecoilState(searchResultData);

  return (
    <div className={s.container}>
      <ul className={s.list_container}>
        {searchData.map((store) => {
          return <StoreList map={map} place={store} key={store.id}></StoreList>;
        })}
      </ul>
      {/* 리스트 하단의 페이지네이션 */}
      {searchData.length > 0 && <StorePagination></StorePagination>}
    </div>
  );
}

export default AroundStore;
