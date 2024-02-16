import {
  Button, Input, Form, Space, Card,
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import { useUser } from '../../context/user.context';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();

  const onFinish = async (data) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      toast.error(`${err}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Bounce,
      });
    }
  };

  /* const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  }; */

  return (
    <>
      <Space
        direction="vertical"
        size={16}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Card title="Login" extra={<Button type="link" onClick={() => navigate('/register')}>Register</Button>} style={{ maxWidth: 500, width: 500 }}>
          <Form
            name="basic"
            style={{
              margin: 'auto',
            }}
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
                {
                  max: 120,
                  message: 'Email max length 120 characters',
                },
                {
                  min: 6,
                  message: 'Email min length 6 characters',
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Password is required',
                },
                {
                  max: 120,
                  message: 'Password max length 120 characters',
                },
                {
                  min: 6,
                  message: 'Password min length 6 characters',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
      <ToastContainer />
    </>
  );
}
