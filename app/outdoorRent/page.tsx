"use client";

import { FacebookOutlined, GoogleOutlined, LockOutlined, MailOutlined, TwitterOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Divider, Form, Input, message, Tabs, Typography } from "antd";
import React, { useState } from "react";

const { Title } = Typography;
const { TabPane } = Tabs;

import { useRequest } from "ahooks";

import { request } from "@/lib/utils";

const AuthPage = () => {
  const { data } = useRequest(async () => {
    const res = await request.get("/outdoor/WeatherForecast");
    return res;
  });
  console.log("@@@data", data);
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm] = Form.useForm();
  const [signupForm] = Form.useForm();

  const handleTabChange = key => {
    setActiveTab(key);
    // Reset form when switching tabs
    if (key === "login") {
      signupForm.resetFields();
    } else {
      loginForm.resetFields();
    }
  };

  const onLoginFinish = values => {
    console.log("Login form submitted:", values);
    message.success("Login request sent!");
    // Add your login logic here
  };

  const onSignupFinish = values => {
    console.log("Signup form submitted:", values);
    message.success("Account created successfully!");
    // Add your signup logic here
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5"
      }}>
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "8px"
        }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2}>Welcome</Title>
        </div>

        <Tabs activeKey={activeTab} onChange={handleTabChange} centered>
          <TabPane tab='Login' key='login'>
            <Form form={loginForm} name='login' onFinish={onLoginFinish} initialValues={{ remember: true }}>
              {/* <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Email" 
                  size="large" 
                />
              </Form.Item> */}

              <Form.Item name='password' rules={[{ required: true, message: "Please input your password!" }]}>
                <Input.Password prefix={<LockOutlined />} placeholder='Password' size='large' />
              </Form.Item>

              <Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href='#forgot'>Forgot password?</a>
                </div>
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' block size='large'>
                  Log in
                </Button>
              </Form.Item>

              <Divider plain>or login with</Divider>

              <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                <Button icon={<GoogleOutlined />} shape='circle' size='large' />
                <Button icon={<FacebookOutlined />} shape='circle' size='large' />
                <Button icon={<TwitterOutlined />} shape='circle' size='large' />
              </div>
            </Form>
          </TabPane>

          <TabPane tab='Sign Up' key='signup'>
            <Form form={signupForm} name='signup' onFinish={onSignupFinish}>
              <Form.Item name='username' rules={[{ required: true, message: "Please input your username!" }]}>
                <Input prefix={<UserOutlined />} placeholder='Username' size='large' />
              </Form.Item>

              <Form.Item
                name='email'
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" }
                ]}>
                <Input prefix={<MailOutlined />} placeholder='Email' size='large' />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters!" }
                ]}>
                <Input.Password prefix={<LockOutlined />} placeholder='Password' size='large' />
              </Form.Item>

              <Form.Item
                name='confirmPassword'
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("The two passwords do not match!");
                    }
                  })
                ]}>
                <Input.Password prefix={<LockOutlined />} placeholder='Confirm Password' size='large' />
              </Form.Item>

              <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                  {
                    validator: (_, value) => (value ? Promise.resolve() : Promise.reject("Please accept the agreement"))
                  }
                ]}>
                <Checkbox>
                  I agree to the <a href='#terms'>Terms of Service</a> and <a href='#privacy'>Privacy Policy</a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' block size='large'>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;
