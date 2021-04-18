import { Layout, Menu } from 'antd';
import React from 'react';

export function MasterPage(props: any) {
  return (
    <Layout className="layout">
      <Layout.Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Welcome</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content style={{ padding: '12px' }}>
        <div className="site-layout-content">{props.children}</div>
      </Layout.Content>
    </Layout>
  );
}
