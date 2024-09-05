import React, { useEffect, useState } from "react";
import s from "../style/community/reply.module.css";
import menu from "../../assets/images/community/menu.png";
import jaxios from "../util/jwtUtil";
import { useSelector } from "react-redux";

function Reply({ reply, tableName, handleReplyUpdate }) {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");
  const [writeTime, setWriteTime] = useState("");
  const lUser = useSelector((state) => state.user);

  useEffect(() => {
    setContent(reply.content);
    setWriteTime(transTime(reply.writedate));
  }, []);

  const deleteReply = () => {
    jaxios
      .post(`/api/community/deleteReply`, {
        seq: tableName,
        seqNum: reply.seq,
        replyNum: reply.replynum,
      })
      .then((res) => {
        handleReplyUpdate();
      });
  };

  const editReply = () => {
    setIsEdit(!isEdit);
  };

  const submitEdit = () => {
    setIsEdit(!isEdit);
    jaxios
      .post(`/api/community/updateReply`, {
        seq: tableName,
        seqNum: reply.seq,
        replyNum: reply.replynum,
        content,
      })
      .then((res) => {
        handleReplyUpdate();
      });
  };

  const transTime = (beforeTime) => {
    // UTC 시간을 Date 객체로 변환
    const utcDate = new Date(beforeTime);

    // 한국 표준시(KST)로 변환 (UTC+9)
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    // 변환된 시간을 ISO 형식으로 출력
    const kstDateStr = kstDate.toISOString().slice(0, 16).replace("T", " ");

    return kstDateStr;
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
        <span>{writeTime}</span>
      </div>
    </div>
  );
}

export default Reply;
