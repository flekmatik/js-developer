import { Layout, theme, Typography } from 'antd';

export const AppHeader = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout.Header style={{ background: colorBgContainer, marginBottom: 5 }}>
            <Typography.Title level={5} style={{ lineHeight: '64px' }}>JS Developer position</Typography.Title>
        </Layout.Header>
    );
}