import { Widget } from '@/server/routers/_app';
import { trpc } from '@/utils/trpc';
import { HeartFilled, HeartOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Row, Col, Avatar, Button } from 'antd';
import { useCallback, useMemo } from 'react';

interface PageCardProps {
    widgetId: Widget;
    children: JSX.Element,
}

export const PageCard = ({ children, widgetId }: PageCardProps) => {
    const utils = trpc.useContext();
    const { data: favorites } = trpc.favorites.useQuery();
    const favorite = trpc.favorite.useMutation({
        onSuccess() {
            utils.favorites.invalidate();
        },
    });

    const isFavorite = useMemo(() => favorites?.includes(widgetId) ?? false, [favorites, widgetId]);

    const handleFavorite = useCallback(() => {
        favorite.mutate({ widgetId, isFavorite: !isFavorite });
    }, [isFavorite, widgetId]);

    return (
        <Card title="Chart Title">
            {children}
            <Card.Grid
                style={{ width: '100%', padding: '5px 10px' }}
                hoverable={false}
            >
                <Row justify="space-between">
                    <Col>
                        <Avatar size="small" icon={<UserOutlined />} aria-label="user avatar" />
                    </Col>
                    <Col>
                        {favorites && (
                            <Button
                                type="text"
                                style={{
                                    padding: '0px 5px',
                                    height: 'auto',
                                    marginRight: 5,
                                }}
                                onClick={handleFavorite}
                                aria-label="favorite"
                            >
                                {favorites?.includes(widgetId)
                                    ? <HeartFilled />
                                    : <HeartOutlined />}
                            </Button>
                        )}
                        <Button type="text" disabled style={{ padding: 0, height: 'auto' }} aria-label="comments">
                            3
                            <MessageOutlined style={{ marginLeft: 4 }} />
                        </Button>
                    </Col>
                </Row>
            </Card.Grid>
        </Card>
    );
};
