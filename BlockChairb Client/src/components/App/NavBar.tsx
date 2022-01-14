import React from "react";
import { Component } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MessageOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import "./NavBar.css";
import { logout, updateUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { userInfo } from "os";

const generateRandomAvatar = () => {
  let randomInt = Math.floor(Math.random() * 1000);

  return "https://avatars.dicebear.com/api/human/" + randomInt + ".svg";
};
interface User {
  [key: string]: any;
}
interface IProps {
  user: User;
  dispatch: any;
  history: any;
}

interface IState {
  username: "string";
  avatar: any;
}

class Navbar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      username:
        this.props.user &&
        this.props.user.username &&
        this.props.user.avatar.length != 0
          ? this.props.user.username
          : "Unknown",
      avatar:
        this.props.user && this.props.user.avatar.length != 0
          ? this.props.user.avatar
          : generateRandomAvatar(),
    };
  }

  //dispatch = useDispatch();
  componentDidMount() {
    const { dispatch, history } = this.props;
    let user: any = { ...this.props.user };
    user.avatar = this.state.avatar;
    dispatch(updateUser(user));
  }
  componentDidUpdate() {
    if (
      this.props.user &&
      this.props.user.username &&
      this.props.user.username != this.state.username
    )
      this.setState({ username: this.props.user.username });
  }

  handleLogOut = () => {
    const { dispatch, history } = this.props;
    dispatch(logout());
    history.push("/home");
  };

  handlePublicChat = () => {
    const { dispatch, history } = this.props;
    history.push("/publicChat");
  };

  handleGroupChat = () => {
    const { dispatch, history } = this.props;
    history.push("/groupChat");
  };

  handleChat = () => {
    const { dispatch, history } = this.props;
    history.push("/Chat");
  };

  handleProfile = () => {
    const { dispatch, history } = this.props;
    history.push("/Profile");
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbarContent">
          <div className="userProfile">
            <img src={this.state.avatar} alt="" />
            <span>{this.state.username}</span>
          </div>
          <Menu className="menuContent" mode="inline">
            <Menu.Item key="1" onClick={this.handlePublicChat}>
              <AppstoreOutlined />
              <span>Public Chat v1</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={this.handleChat}>
              <MessageOutlined />
              <span>Chat</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={this.handleGroupChat}>
              <UsergroupAddOutlined />
              <span>Groups</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={this.handleProfile}>
              <UserOutlined />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="5">
              <SettingOutlined />
              <span>Settings</span>
            </Menu.Item>
          </Menu>
          <Menu className="logout" mode="inline">
            <Menu.Item key="6" onClick={this.handleLogOut}>
              <LogoutOutlined />
              <span>Log Out</span>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
