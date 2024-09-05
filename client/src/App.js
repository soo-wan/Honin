import { Routes, Route } from "react-router-dom";
import Main from "./Component/Main";
import Kakaosaveinfo from "./Component/member/Kakaosaveinfo";
import Secondhand from "./Component/secondhand/Secondhand";
import Naversaveinfo from "./Component/member/Naversaveinfo";
import Community from "./Component/community/Community";
import NCareer from "./Component/notice/NCareer";
import NPolicy from "./Component/notice/NPolicy";
import SecondhandView from "./Component/secondhand/SecondhandView";
import CommunityView from "./Component/community/CommunityView";
import NcareerView from "./Component/notice/NcareerView";
import NpolicyView from "./Component/notice/NpolicyView";
import SecondhandWrite from "./Component/secondhand/SecondhandWrite";
import SecondhandUpdate from "./Component/secondhand/SecondhandUpdate";
import CommunityWrite from "./Component/community/CommunityWrite";
import CommunityUpdate from "./Component/community/CommunityUpdate";
import LoginJoin from "./Component/member/LoginJoin";
import Mypage from "./Component/mypage/Mypage";
import StoreMap from "./Component/mystore/StoreMap";
import AdminLogin from "./Component/admin/AdminLogin";
import AdminMain from "./Component/admin/AdminMain";
import AdminMemberList from "./Component/admin/AdminMemberList";
import ScrollToTop from "./Component/util/ScrollToTop";
import AdminNCareerList from "./Component/admin/AdminNCareerList";
import AdminNPolicyList from "./Component/admin/AdminNPolicyList";
import AdminNPolicyWrite from "./Component/admin/AdminNPolicyWrite";
import AdminNCareerWrite from "./Component/admin/AdminNCareerWrite";
import AdminNCView from "./Component/admin/AdminNCView";
import AdminNPView from "./Component/admin/AdminNPView";
import AdminNPupdate from "./Component/admin/AdminNPupdate";
import AdminNCupdate from "./Component/admin/AdminNCupdate";
import CommunityMyList from "./Component/mypage/CommunityMyList";
import SecondhandMyList from "./Component/mypage/SecondhandMyList";
import SteamedList from "./Component/mypage/SteamedList";
import MyRefrigerator from "./Component/myrefrigerator/MyRefrigerator";
import ChatApp from "./Component/secondhand/ChatApp";
import ChatRoom from "./Component/secondhand/ChatRoom";

function App() {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<Main></Main>} />

        {/* 회원관리 */}
        <Route path="/login/:state" element={<LoginJoin></LoginJoin>} />
        <Route path="/join/:state" element={<LoginJoin></LoginJoin>} />
        <Route path="/kakaosaveinfo/:nickname" element={<Kakaosaveinfo />} />
        <Route path="/naversaveinfo/:nickname" element={<Naversaveinfo />} />

        {/* 커뮤니티 */}
        <Route path="/community" element={<Community />} />
        <Route path="/communityView/:seq/:seqNum" element={<CommunityView />} />
        <Route path="/communityWrite" element={<CommunityWrite />} />
        <Route
          path="/communityUpdate/:seq/:seqNum"
          element={<CommunityUpdate />}
        />

        {/* 소식지 */}
        <Route path="/ncareer" element={<NCareer />} />
        <Route path="/ncareerView/:ncnum" element={<NcareerView />} />
        <Route path="/npolicy" element={<NPolicy />} />
        <Route path="/npolicyView/:npnum" element={<NpolicyView />} />

        {/* 우리동네맛집 */}
        <Route path="/storeMap" element={<StoreMap />} />

        {/* 중고거래 */}
        <Route path="/secondhand" element={<Secondhand />} />
        <Route path="/secondhandView/:num" element={<SecondhandView />} />
        <Route path="/secondhandUpdate/:num" element={<SecondhandUpdate />} />
        <Route path="/secondhandWrite" element={<SecondhandWrite />} />
        <Route path="/chatapp/:snum/:seller" element={<ChatApp/>} />
        <Route path="/chat/room/:chatRoomId" element={<ChatRoom/>} />

        {/* 마이페이지 */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/communitymylist" element={<CommunityMyList />} />
        <Route path="/secondhandmylist" element={<SecondhandMyList />} />
        <Route path="/steamedlist" element={<SteamedList />} />
        <Route path="/myrefrigerator" element={<MyRefrigerator />} />

        {/* 관리자페이지 */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminmain" element={<AdminMain />} />
        <Route path="/adminmemberList" element={<AdminMemberList />} />
        <Route path="/adminncareerList" element={<AdminNCareerList />} />
        <Route path="/adminnpolicyList" element={<AdminNPolicyList />} />
        <Route path="/adminnpolicyWrite" element={<AdminNPolicyWrite />} />
        <Route path="/adminncareerWrite" element={<AdminNCareerWrite />} />
        <Route path="/adminncView/:ncnum" element={<AdminNCView />} />
        <Route path="/adminnpView/:npnum" element={<AdminNPView />} />
        <Route path="/adminnpUpdate/:npnum" element={<AdminNPupdate />} />
        <Route path="/adminncUpdate/:ncnum" element={<AdminNCupdate />} />
      </Routes>
    </div>
  );
}

export default App;
