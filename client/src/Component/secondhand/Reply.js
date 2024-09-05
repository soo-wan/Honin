import React, { useEffect, useState } from "react";
import s from "../style/secondhand/reply.module.css";
import menu from "../../assets/images/community/menu.png";
import jaxios from "../util/jwtUtil";
import { useSelector } from "react-redux";

function Reply({ reply, handleReplyUpdate }) {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");
  const lUser = useSelector((state) => state.user);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    setContent(reply.content);
  }, [reply.content]);

  const formatDateTime = (date) => {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2); // 'yy'
    const month = String(d.getMonth() + 1).padStart(2, "0"); // 'mm'
    const day = String(d.getDate()).padStart(2, "0"); // 'dd'
    const hour = String(d.getHours()).padStart(2, "0"); // 'hour'
    const minute = String(d.getMinutes()).padStart(2, "0"); // 'min'

    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  const deleteReply = () => {
    jaxios
      .delete(`/api/secondhand/deleteReply/${reply.snum}/${reply.srnum}`)
      .then((res) => {
        handleReplyUpdate();
      })
      .catch((error) => {
        console.error("Error deleting reply:", error);
      });
  };

  const editReply = () => {
    setIsEdit(!isEdit);
  };

  const submitEdit = () => {
    setIsEdit(!isEdit);
    jaxios
      .post(`/api/secondhand/updateReply/${reply.snum}/${reply.srnum}`, {
        content,
      })
      .then((res) => {
        handleReplyUpdate();
      });
  };

  return (
    <div className={s.reply}>
      <div className={s.reply_layout}>
        <div style={{fontWeight:"bold"}}>{reply.writer}</div>
        {lUser.nickname === reply.writer && (
          <button
            className={s.reply_btn}
            onClick={() => setIsDisplay(!isDisplay)}
          >
            <img src={menu} alt="댓글 메뉴" />
            {isDisplay && (
              <div className={s.reply_menu}>
                <div className={s.reply_edit} onClick={() => editReply()}>
                  수정
                </div>
                <div className={s.reply_del} onClick={() => deleteReply()}>
                  삭제
                </div>
              </div>
            )}
          </button>
        )}
      </div>
      <div className={s.reply_layout}>
        {isEdit ? (
          <div className={s.edit_input}>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
            <button
              onClick={() => {
                submitEdit();
              }}
            >
              수정완료
            </button>
          </div>
        ) : (
          <div>{reply.content}</div>
        )}
        <span>{formatDateTime(reply.writedate)}</span>
      </div>
    </div>
  );
}

export default Reply;
