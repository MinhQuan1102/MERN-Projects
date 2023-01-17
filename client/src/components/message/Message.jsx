import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

const Message = ({ message, own, senderImg, receiverImg }) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={own? PF + senderImg : PF + receiverImg} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
