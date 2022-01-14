import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "../styles/GroupChat.css";
import { useState } from "react";
import { selectUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/ChatComponents/Sidebar";
import GroupSidebar from "../components/GroupChatComponents/GroupSidebar";
import PeopleIcon from "@material-ui/icons/People";

function Chat(props: any) {
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");
  const [avatar, setAvatar] = useState("");
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState([
    {
      name: "Touda",
      msg: "Yoo who wanna play tonight",
      to: "Gaming Group",
      timestamp: new Date(),
    },
    {
      name: "David",
      msg: "Hi guys what's poppin",
      to: "The Avengers",
      timestamp: new Date(),
    },
    {
      name: "Marie",
      msg: "its about drive, its about power, we stay hungry we devour!!",
      to: "Memes Group",
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
        <GroupSidebar func={changeRoom} />
      </div>
      <div className="chat">
        <div className="chat_header">
          <PeopleIcon />

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
              message.to == room && (
                <p
                  className={`chat_message ${
                    message.name == user.username && "chat_receiver"
                  }`}
                >
                  <span className="chat_name">
                    {message.name.split(" ")[0]}
                  </span>
                  {message.msg}
                  <span className="chat_timestemp">
                    {" "}
                    {message.timestamp.getHours() +
                      ":" +
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
