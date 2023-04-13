import { useCallback, useEffect, useState } from 'react';

interface ResponseData {
    date: string;
    cumCasesByPublishDate: number;
}

export const NewCasesChart = () => {
    const [chartRef, setChartRef] = useState<any>();
    const [responseData, setResponseData] = useState<ResponseData[]>();

    const refCallback = useCallback(async (node: any) => {
        if (node && !chartRef) {
            const { Chart } = await import('@antv/g2');
            const chart = new Chart({
                container: node,
                height: 300,
            });
            chart.axis('cumCasesByPublishDate', {
                label: {
                    formatter: text => Number(text).toLocaleString(),
                },
            });
            chart.forceFit();
            chart.line()
                .position('date*cumCasesByPublishDate')
                .tooltip('date*cumCasesByPublishDate', (date, cumCasesByPublishDate) => ({
                    name: 'Total cases',
                    value: cumCasesByPublishDate.toLocaleString(),
                }));

            const handler = () => chart.forceFit();
            window.addEventListener('resize', handler, true);
            setChartRef(chart);
            return window.removeEventListener('resize', handler);
        }
    }, []);

    useEffect(() => {
        chartRef?.data(responseData ?? []);
        chartRef?.render();
    }, [chartRef, responseData]);

    useEffect(() => {
        fetch('https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=England;areaType=nation&structure=["date","cumCasesByPublishDate"]')
            .then(res => res.json())
            .then(json => setResponseData(json.data));
    }, []);

    return (
        <div
            aria-label="new cases chart"
            ref={refCallback}
            style={{ width: '100%', padding: 20 }}
        />
    );
};
