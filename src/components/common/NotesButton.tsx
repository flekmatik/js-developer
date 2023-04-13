import { Button, theme, Typography } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

export const NotesButton = () => {
    const { token: { colorPrimary } } = theme.useToken();

    return (
        <Button>
            Notes
            <Typography.Text type="secondary">(3)</Typography.Text>
            <MenuOutlined style={{ color: colorPrimary }} />
        </Button>
    );
}