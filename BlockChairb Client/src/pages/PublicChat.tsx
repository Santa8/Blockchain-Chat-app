import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import "../styles/GroupChat.css";
import { selectUser } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/ChatComponents/Sidebar";
import GroupSidebar from "../components/GroupChatComponents/GroupSidebar";
import PeopleIcon from "@material-ui/icons/People";
import { useEffect, useState, useReducer } from "react";
import Gun from "gun";

const gun = Gun({
  peers: ["https://calm-eyrie-91768.herokuapp.com/gun"],
});

const initialState = {
  messages: [],
};

function reducer(state: any, message: any) {
  return {
    messages: [...state.messages, message],
  };
}

function Chat(props: any) {
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");
  const [avatar, setAvatar] = useState("");
  const user = useSelector(selectUser);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //console.log(state.messages);
  }, [state]);

  useEffect(() => {
    const messages = gun.get("messages");
    messages.map().once((m: any) => {
      dispatch({
        name: m.name,
        msg: m.msg,
        timestamp: m.timestamp,
        to: m.to,
      });
    });
  }, []);

  function saveMessage(e: any) {
    e.preventDefault();
    const messages = gun.get("messages");
    messages.set({
      name: user.username,
      msg: input,
      timestamp: Date.now(),
      to: room,
    });
    setInput("");
  }

  const changeRoom = (roomName: string, avatar: string) => {
    setRoom(roomName);
    setAvatar(avatar);
  };

  return (
    <div className="main">
      <div className="chat">
        <div className="chat_header">
          <PeopleIcon />

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
          {state.messages.map((message) => (
            <p
              className={`chat_message ${
                message.name == user.username && "chat_receiver"
              }`}
            >
              <span className="chat_name">{message.name.split(" ")[0]}</span>
              {message.msg}
            </p>
          ))}
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
            <button type="submit" onClick={saveMessage}>
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
