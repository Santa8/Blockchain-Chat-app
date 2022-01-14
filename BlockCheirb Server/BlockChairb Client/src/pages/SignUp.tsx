import React, { Component, useState } from "react";
import { Form, Input, Button } from "antd";
import "../styles/Forms.css";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signUp } from "../redux/features/userSlice";
import { user } from "../Gun";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const SignUpForm = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

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

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e: any) => {
    user.create(pseudo, password, ({ err }: any) => {
      if (err) {
        alert(err);
      } else {
        user.auth(pseudo, password, async ({ err, get }: any) => {
          if (err) alert(err);
          else {
            const alias = await user.get("alias"); // username string
            console.log(get);
            let ReducerUser: any = { avatar: "", username: alias };

            dispatch(signUp(ReducerUser));
            history.push("/chat");
          }
        });
      }
    });
  };

  return (
    <Form
      {...formItemLayout}
      className="Form"
      form={form}
      layout="vertical"
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      id="register_form"
      onSubmitCapture={(e) => handleSubmit(e)}
    >
      <Form.Item label="Pseudo" name="Pseudo" rules={[{ required: true }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          onChange={(e) => {
            setPseudo(e.target.value);
          }}
        />{" "}
      </Form.Item>

      <Form.Item label="Password" name="Password" rules={[{ required: true }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

function SignUp() {
  return (
    <div className="FormPage">
      <SignUpForm />
    </div>
  );
}

export default SignUp;
