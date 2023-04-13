import Head from 'next/head';
import { Layout } from 'antd';
import { AppHeader } from '@/components/app/AppHeader';
import { AppContent } from '@/components/app/AppContent';
import 'antd/dist/reset.css';

export default function Home() {
    return (
        <>
            <Head>
                <title>JS Developer position</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <Layout style={{ height: '100vh' }}>
                    <AppHeader />
                    <AppContent />
                </Layout>
            </main>
        </>
    );
}
