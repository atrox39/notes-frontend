import {
  Button, Input, Form, Space, Card,
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import { useUser } from '../../context/user.context';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useUser();

  const onFinish = async (data) => {
    try {
      await register(data);
      navigate('/');
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
        <Card
          title="Register"
          extra={(
            <Button type="link" onClick={() => navigate('/')}>
              Login
            </Button>
          )}
          style={{ maxWidth: 500, width: 500 }}
        >
          <Form
            name="basic"
            style={{
              margin: 'auto',
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Username is required',
                },
                {
                  max: 120,
                  message: 'Username max length 120 characters',
                },
                {
                  min: 6,
                  message: 'Username min length 6 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>
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
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
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
