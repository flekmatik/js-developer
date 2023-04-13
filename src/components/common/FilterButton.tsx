import { FilterOutlined } from '@ant-design/icons';
import { Badge, Button, theme } from 'antd';

export const FilterButton = () => {
    const { token: { colorPrimary } } = theme.useToken();

    return (
        <Button style={{ display: 'flex', alignItems: 'center' }}>
            Filter
            <Badge
                count={11}
                color={colorPrimary}
                overflowCount={9}
                size="small"
                style={{
                    marginLeft: 5,
                    // display: 'inline-flex',
                    // alignItems: 'center'
                }}
            />
            <FilterOutlined style={{ color: colorPrimary }} />
        </Button>
    );
}