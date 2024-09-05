import React from "react";
import s from "../style/mystore/searchStore.module.css";
import search1 from "../../assets/images/mystore/search1.png";
import { useRecoilState } from "recoil";
import StoreList from "./StoreList";
import { searchResultData } from "./recoil/searchState";
import StorePagination from "./StorePagination";

function SearchStore({ map }) {
  // 검색 결과 데이터
  const [searchData, setSearchData] = useRecoilState(searchResultData);

  return (
    <div className={s.container}>
      <ul className={s.list_container}>
        {!searchData.length && (
          <div className={s.no_data_msg}>
            <img src={search1} />
            <div>검색 결과가 없습니다</div>
          </div>
        )}
        {searchData.map((store, idx) => {
          return <StoreList map={map} place={store} key={store.id}></StoreList>;
        })}
      </ul>
      {/* 리스트 하단의 페이지네이션 */}
      {searchData.length > 0 && <StorePagination></StorePagination>}
    </div>
  );
}

export default SearchStore;
