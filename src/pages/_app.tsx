import '@/styles/globals.css';
import { ConfigProvider } from 'antd';
import type { AppType } from 'next/app';
import { trpc } from '@/utils/trpc';

const App: AppType = ({ Component, pageProps }) => (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#0f7365',
            },
        }}
    >
        <Component {...pageProps} />
    </ConfigProvider>
);

export default trpc.withTRPC(App);

