import React, { Component, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "../styles/Forms.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { user } from "../Gun";
import "gun/sea";
import "gun/axe";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const LoginForm = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  async function handleLogin() {
    user.auth(pseudo, password, ({ err }: any) => err && alert(err));
    const alias = await user.get("alias"); // username string
    let ReducerUser: any;
    ReducerUser.avatar = "";
    ReducerUser.username = alias;
    dispatch(login(ReducerUser));
    history.push("/chat");
  }

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: { span: 14, offset: 4 },
        }
      : null;

  return (
    <Form
      {...formItemLayout}
      className="Form"
      form={form}
      layout="vertical"
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item
        name="Pseudo"
        rules={[
          {
            required: true,
            message: "Please input your Pseudo!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Pseudo"
          type="Pseudo"
          onChange={(e) => {
            setPseudo(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button
          id="login_button"
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={() => {
            if (pseudo !== "" && password !== "") handleLogin();
          }}
        >
          <p> Login </p>
        </Button>
      </Form.Item>
      <a href="http://localhost:3000/signup" id="register_now">
        Register now!
      </a>
    </Form>
  );
};

function LoginPage() {
  return (
    <div className="FormPage">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
