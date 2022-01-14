import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "../styles/Chat.css";
import { useState } from "react";
import { selectUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/ChatComponents/Sidebar";

function Chat(props: any) {
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");
  const [avatar, setAvatar] = useState("");
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState([
    {
      name: "David",
      msg: "whatssap man !!",
      to: user.username,
      timestamp: new Date(),
    },
    {
      name: "Marie",
      msg: "how are you doing",
      to: user.username,
      timestamp: new Date(),
    },
    {
      name: "Bob",
      msg: "Yooooo !!! :)",
      to: user.username,
      timestamp: new Date(),
    },
  ]);

  const changeRoom = (roomName: string, avatar: string) => {
    setRoom(roomName);
    setAvatar(avatar);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { name: user.username, msg: input, to: room, timestamp: new Date() },
    ]);
    setInput("");
  };

  return (
    <div className="main">
      <div className="chat1">
        <Sidebar func={changeRoom} />
      </div>
      <div className="chat">
        <div className="chat_header">
          <Avatar src={avatar} />

          <div className="chat_headerInfo">
            <p className="chat-room-last-seen">{room}</p>
          </div>
          <div className="chat_headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>

            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className="chat_body">
          {messages.map(
            (message) =>
              (message.name == room ||
                (message.name == user.username && message.to == room)) && (
                <p
                  className={`chat_message ${
                    !(message.to == user.username) && "chat_receiver"
                  }`}
                >
                  {message.msg}
                  <span
                    className={`chat_timestemp ${
                      !(message.to == user.username) &&
                      "chat_timestemp_receiver"
                    }`}
                  >
                    {" "}
                    {message.timestamp.getHours() +
                      ":" +
                      (message.timestamp.getMinutes() < 10 ? "0" : "") +
                      message.timestamp.getMinutes()}
                  </span>
                </p>
              )
          )}
        </div>
        <div className="chat_footer">
          <InsertEmoticonIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Type a message"
            />
            <button type="submit" onClick={sendMessage}>
              {" "}
              Send a Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
