import React from "react";
import s from "../style/mystore/myFavoriteStore.module.css";
import { useRecoilState } from "recoil";
import { searchResultData } from "./recoil/searchState";
import StoreList from "./StoreList";
import StorePagination from "./StorePagination";

function MyFavoriteStore({ map }) {
  const [searchData, setSearchData] = useRecoilState(searchResultData);

  return (
    <div className={s.container}>
      <ul className={s.list_container}>
        {searchData.map((store, idx) => {
          return <StoreList map={map} place={store} key={store.id}></StoreList>;
        })}
      </ul>
    </div>
  );
}

export default MyFavoriteStore;
