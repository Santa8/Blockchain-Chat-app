import "./GroupSidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Col } from "antd";
import { Console } from "console";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PeopleIcon from "@material-ui/icons/People";

const generateRandomAvatar = () => {
  let randomInt = Math.floor(Math.random() * 1000);

  return "https://avatars.dicebear.com/api/human/" + randomInt + ".svg";
};
interface Iprops {
  func: any;
}

function Sidebar(props: Iprops) {
  const [rooms, setRooms]: any = useState([
    { name: "Gaming Group", members: ["David", "Marie", "Touda"] },
    { name: "The Avengers", members: ["David", "Marie", "Touda"] },
    { name: "Memes Group", members: ["David", "Marie", "Touda"] },
  ]);

  const [filtredRooms, setFiltredRooms] = useState(rooms);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    filterRooms();
    props.func(rooms[0].name, rooms[0].avatar);
  }, [inputSearch, rooms]);

  const filterRooms = async () => {
    if (inputSearch.length !== 0) {
      let tempRooms: any = [];
      rooms.map((room: any) => {
        if (
          inputSearch.toUpperCase() ===
          room.name.substring(0, inputSearch.length).toUpperCase()
        ) {
          tempRooms = [...tempRooms, room];
        }
      });
      console.log(tempRooms);
      setFiltredRooms(tempRooms);
    } else {
      setFiltredRooms(rooms);
    }
  };

  const startChat = async () => {
    const MySwal = withReactContent(Swal);

    const { value: adress }: any = await MySwal.fire({
      title: "Enter a name for the new chat",
      input: "text",
      inputLabel: "chat address",
      inputPlaceholder: "Please Enter Adress for Chat",
    });

    if (adress) {
      //Swal.fire(`Chat added: ${adress}`);
      CreateRoom(adress);
      console.log(adress);
    }
  };

  const CreateRoom = (roomName: string) => {
    setRooms([...rooms, { name: roomName, avatar: generateRandomAvatar() }]);
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_headerRight"></div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <input
            type="text"
            placeholder="Search or start new chat"
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="chatList">
        {filtredRooms.map((item: any, index: any) => {
          return (
            <div
              className="sidebarChat"
              onClick={() => props.func(item.name, item.avatar)}
            >
              <PeopleIcon />
              <div className="sidebarChat_info">
                <h2>{item.name}</h2>
                <p>Sorry !</p>
              </div>
            </div>
          );
        })}
      </div>

      <div onClick={startChat} className="addChat">
        <h3 className="add-new-chat-title">Add New Group</h3>
      </div>
    </div>
  );
}

export default Sidebar;
