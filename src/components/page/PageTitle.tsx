import { ExportToPdfButton } from '@/components/common/ExportToPdfButton';
import { FilterButton } from '@/components/common/FilterButton';
import { NotesButton } from '@/components/common/NotesButton';
import { Col, Row, Space } from 'antd';

export const PageTitle = () => {
    return (
        <Row style={{ margin: '16px 0' }} align="middle">
            <Col flex="auto">Page title</Col>
            <Col>
                <Space>
                    <ExportToPdfButton />
                    <NotesButton />
                    <FilterButton />
                </Space>
            </Col>
        </Row>
    );
}