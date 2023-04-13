import { useCallback, useEffect, useMemo, useState } from 'react';

interface ResponseData {
    age: string;
    value: number;
}

export const AgeDistributionChart = () => {
    const [chartRef, setChartRef] = useState<any>();
    const [responseData, setResponseData] = useState<ResponseData[]>();

    const chartData = useMemo(() => {
        if (!responseData) {
            return;
        }
        const total = responseData.reduce((acc, cur) => acc + cur.value, 0);
        return responseData
            .map(entry => {
                const [from, to] = entry.age.split(/_to_|\+/).map(Number);
                return ({
                    ratio: entry.value / total,
                    from,
                    label: to ? `${from} to ${to}` : `${from}+`,
                });
            })
            .sort((a, b) => a.from - b.from);
    }, [responseData]);

    const refCallback = useCallback(async (node: any) => {
        if (node && !chartRef) {
            const G2 = await import('@antv/g2');
            const chart = new G2.Chart({
                container: node,
                height: 300,
            });
            chart.forceFit();
            chart.tooltip({ showTitle: false });
            chart.interval()
                .position('ratio')
                .color('label')
                .tooltip('label*ratio', (label, ratio) => ({
                    name: label,
                    value: `${Math.round(ratio * 100)}%`,
                }))
                .adjust('stack');
            chart.coordinate('theta', { radius: 0.75 });

            const handler = () => chart.forceFit();
            window.addEventListener('resize', handler, true);
            setChartRef(chart);
            return window.removeEventListener('resize', handler);
        }
    }, []);

    useEffect(() => {
        chartRef?.data(chartData ?? []);
        chartRef?.render();
        chartRef?.forceFit();
    }, [chartRef, chartData]);

    useEffect(() => {
        fetch('https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=England;areaType=nation&latestBy=cumAdmissionsByAge&structure=["cumAdmissionsByAge"]')
            .then(res => res.json())
            .then(json => setResponseData(json.data[0].cumAdmissionsByAge));
    }, []);

    return <div ref={refCallback} style={{ width: '100%', padding: 20 }} />;
};
