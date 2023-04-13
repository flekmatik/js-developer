import { Button, theme } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export const ExportToPdfButton = () => {
    const { token: { colorPrimary } } = theme.useToken();
    return (
        <Button>
            Export to PDF
            <DownloadOutlined style={{ color: colorPrimary }} />
        </Button>
    );
}