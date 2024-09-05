import React, { useEffect, useRef, useState } from "react";
import jaxios from "../util/jwtUtil";
import s from "../style/admin/adminlist.module.css";
import AdminMainSubmenu from "./AdminSubmenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminMemberList() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserState, setSelectedUserState] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const navigate = useNavigate();
  const checkBoxRefs = useRef({});
  const AdminUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!AdminUser.accessToken || !AdminUser.refreshToken) {
        window.alert("관리자만 접근 가능한 페이지입니다.");
        navigate("/adminlogin");
      }
      try {
        const result = await jaxios.get("/api/admin/memberList");
        setMembers(result.data.memberList);
        setFilteredMembers(result.data.memberList);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, members]);

  const handleMenuClick = (path) => {
    navigate(path); // 서브메뉴 클릭 시 해당 페이지로 이동
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = members.filter(
      (member) =>
        member.nickname.toLowerCase().includes(lowercasedTerm) ||
        member.email.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredMembers(filtered);
  };

  const handleUserStateChange = (nickname, newState) => {
    jaxios
      .post("/api/admin/userstateChange", null, {
        params: { nickname, state: newState },
      })
      .then((response) => {
        const { status, msg } = response.data;
        if (status === "success") {
          setMembers((prevMembers) =>
            prevMembers.map((member) =>
              member.nickname === nickname
                ? { ...member, userstate: newState }
                : member
            )
          );
          setFilteredMembers((prevFiltered) =>
            prevFiltered.map((member) =>
              member.nickname === nickname
                ? { ...member, userstate: newState }
                : member
            )
          );
          alert(msg);
        } else {
          alert(msg);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("서버 요청 실패. 콘솔을 확인하세요.");
      });
  };

  const handleBulkStateChange = (newState) => {
    selectedMembers.forEach((nickname) => {
      handleUserStateChange(nickname, newState);
    });
    setSelectedMembers([]); // 상태 변경 후 선택된 회원 목록 초기화
  };

  const toggleMemberSelection = (nickname) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(nickname)
        ? prevSelected.filter((item) => item !== nickname)
        : [...prevSelected, nickname]
    );
  };

  const handleRowClick = (nickname) => {
    // 현재 선택된 체크박스가 있는지 확인
    const isSelected = selectedMembers.includes(nickname);
    // 선택 상태를 반전
    if (isSelected) {
      setSelectedMembers((prev) => prev.filter((item) => item !== nickname));
    } else {
      setSelectedMembers((prev) => [...prev, nickname]);
    }
  };

  return (
    <div className={s.container}>
      <AdminMainSubmenu onMenuClick={handleMenuClick} />
      <div className={s.mainContent}>
        {loading && <p className={s.loading}>Loading...</p>}
        {error && <p className={s.error}>{error}</p>}
        {!loading && !error && (
          <div className={s.searchContainer}>
            <h2 className={s.title}>회원 목록</h2>
            <div className={s.search_box}>
              <input
                type="text"
                placeholder="Search by nickname or email"
                value={searchTerm}
                onChange={handleSearchChange}
                className={s.searchInput}
              />
              <button onClick={handleSearch} className={s.searchButton}>
                Search
              </button>
            </div>
            <div className={s.stateFilter}>
              <select
                id="userstate"
                value={selectedUserState}
                onChange={(e) => setSelectedUserState(e.target.value)}
                className={s.stateSelect}
              >
                <option value="">상태변경</option>
                <option value="Y">활성</option>
                <option value="N">휴면(탈퇴)</option>
              </select>
              <button
                onClick={() => handleBulkStateChange(selectedUserState)}
                className={s.changeStateButton}
                disabled={!selectedUserState}
              >
                Apply
              </button>
            </div>
          </div>
        )}
        {!loading && !error && (
          <div className={s.board}>
            <div className={s.header}>
              <div className={s.field}>Nickname</div>
              <div className={s.field}>Email</div>
              <div className={s.field}>Phone</div>
              <div className={s.field}>Address</div>
              <div className={s.field}>Zip Code</div>
              <div className={s.field}>Status</div>
              <div className={s.field}>Select</div>
            </div>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member.nickname}
                  className={s.memberRow}
                  onClick={() => handleRowClick(member.nickname)}
                >
                  <div className={s.cell}>{member.nickname}</div>
                  <div className={s.cell}>{member.email}</div>
                  <div className={s.cell}>{member.phone}</div>
                  <div
                    className={s.cell}
                  >{`${member.address1}, ${member.address2}, ${member.address3}`}</div>
                  <div className={s.cell}>{member.zipnum}</div>
                  <div className={s.cell}>{member.userstate}</div>
                  <div className={s.cell}>
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.nickname)}
                      readOnly
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className={s.noData}>회원 정보가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMemberList;
