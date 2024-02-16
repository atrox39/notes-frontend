import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  FormOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import {
  Layout, Menu, Button, theme,
} from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/user.context';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children, index = '1' }) {
  const { logout } = useUser();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onSelect = (value) => {
    if (value.key === 'logout') {
      logout();
      navigate('/');
      return;
    }
    navigate(value.key);
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[index]}
          items={[
            {
              key: '/dashboard',
              icon: <HomeOutlined />,
              label: 'All Notes',
            },
            {
              key: '/dashboard/notes',
              icon: <FormOutlined />,
              label: 'Create Note',
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Logout',
            },
          ]}
          onSelect={onSelect}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.string,
};

DashboardLayout.defaultProps = {
  index: '1',
};
