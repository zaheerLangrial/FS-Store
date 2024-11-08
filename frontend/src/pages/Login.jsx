// src/pages/LoginPage.jsx
import React, { useEffect, useState  } from 'react';
import { Button, Form, Input, Card, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/slices/AuthSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const onFinish = (values) => {
    dispatch(loginRequest(values));
  };

 // Show error message when there's an error
 useEffect(() => {
  if (error) {
    message.error("Login failed! Please check your credentials.");
  }
}, [error]);

// Show success message when login is successful
useEffect(() => {
  if (success) {
    message.success("Login successful!");
    
    navigate('/')
  }
}, [success]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-md">
        <Title level={3} className="text-center">Login</Title>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Username or Email"
            name="username"
            rules={[{ required: true, message: 'Please input your username or email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
