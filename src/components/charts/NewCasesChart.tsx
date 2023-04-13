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
            chart.line().position('date*cumCasesByPublishDate');
            setChartRef(chart);
        }
    }, []);

    useEffect(() => {
        chartRef?.data(responseData ?? []);
        chartRef?.render();
        chartRef?.forceFit();
    }, [chartRef, responseData]);

    useEffect(() => {
        fetch('https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=England;areaType=nation&structure=["date","cumCasesByPublishDate"]')
            .then(res => res.json())
            .then(json => setResponseData(json.data));
    }, []);

    return <div ref={refCallback} style={{ width: '100%', padding: 20 }} />;
};
