import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = ({ socket }) => {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [senderPicture, setSenderPicture] = useState("")
  const [receiverPicture, setReceiverPicture] = useState("")
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat?.members.find(
        (member) => member !== user._id
      );

      socket?.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      });
      const res = await axios.post(
        "http://localhost:8800/api/messages",
        message
      );

      socket.emit("sendNotification", {
        senderId: user._id,
        receiverName: receiverId,
      });

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.emit("addUser", user._id);
    socket?.on("getUsers", (users) => {
      setOnlineUsers(
        user.following.filter((friend) =>
          users.some((user) => user.userId === friend)
        )
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/conversations/${user._id}`
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/messages/${currentChat?._id}`
        );
        setMessages(res.data)
      } catch (error) {
        console.log(error);
      }
    };

    const getSender = async () => {
      try {
        const getSender = await axios.get(
          `http://localhost:8800/api/users?userId=${user._id}`
        );
        setSenderPicture(getSender.data.profilePicture);
      } catch (error) {
        console.log(error);
      }
      
    };
    const getReceiver = async () => {
      try {
        const receiverId = currentChat?.members.find(
          (member) => member !== user._id
        );
        const getReceiver = await axios.get(
          `http://localhost:8800/api/users?userId=${receiverId}`
        );
        setReceiverPicture(getReceiver.data.profilePicture)
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
    getSender();
    currentChat && getReceiver();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for friends.."
              className="chatMenuInput"
            />
            {conversations.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Conversation
                  conversation={conversation}
                  key={conversation._id}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                        key={message._id}
                        senderImg={senderPicture}
                        receiverImg={receiverPicture}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="write something.."
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
