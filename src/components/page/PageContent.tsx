import { AgeDistributionChart } from '@/components/charts/AgeDistributionChart';
import { NewCasesChart } from '@/components/charts/NewCasesChart';
import { PageCard } from '@/components/page/PageCard';
import { Col, Row } from 'antd';

export const PageContent = () => {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <PageCard widgetId="age-distribution">
                    <AgeDistributionChart />
                </PageCard>
            </Col>
            <Col span={12}>
                <PageCard widgetId="new-cases">
                    <NewCasesChart />
                </PageCard>
            </Col>
        </Row>
    );
};