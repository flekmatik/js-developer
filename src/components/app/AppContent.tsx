import { Layout } from 'antd';
import { PageTitle } from "@/components/page/PageTitle";
import { PageContent } from "@/components/page/PageContent";

export const AppContent = () => {
    return (
        <Layout.Content style={{ padding: '0 50px' }}>
            <PageTitle />
            <PageContent />
        </Layout.Content>
    );
}