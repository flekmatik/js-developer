import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Row, Col, Avatar, Button } from 'antd';

interface PageCardProps {
    children: JSX.Element,
}

export const PageCard = ({ children }: PageCardProps) => {
    return (
        <Card
            title="Chart Title"
        >
            {children}
            <Card.Grid
                style={{ width: '100%', padding: '5px 10px' }}
                hoverable={false}
            >
                <Row justify="space-between">
                    <Col>
                        <Avatar size="small" icon={<UserOutlined />} />
                    </Col>
                    <Col>
                        <Button type="text" disabled style={{ padding: 0, height: 'auto' }}>
                            3
                            <MessageOutlined style={{ marginLeft: 4 }} />
                        </Button>
                    </Col>
                </Row>
            </Card.Grid>
        </Card>
    );
};