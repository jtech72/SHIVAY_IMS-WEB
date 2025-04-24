// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// component
import CardTitle from './CardTitle';

const PerformanceChart = (): React$Element<any> => {
    const apexBarChartOpts = {
        chart: {
            height: 230,
            type: 'bar',
            stacked: true,
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '20%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#727cf5', '#e3eaef'],
        xaxis: {
            categories: [10, 11, 12, 13, 14, 15, 16,],
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val ;
                },
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return '$' + val + 'k';
                },
            },
        },
    };

    const apexBarChartData = [
        {
            name: 'Actual',
            data: [65, 59, 80, 81, 56, 89, 40,],
        },
        {
            name: 'Projection',
            data: [89, 40, 32, 65, 59, 80, 81,],
        },
    ];

    return (
        <Card className=" mb-0" style={{boxShadow:'none'}}>
            <Card.Body className='p-0'>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between fs-6"
                    title="Stock In VS Dispatch"
                    menuItems={[
                        { label: 'Sales Report' },
                        { label: 'Export Report' },
                        { label: 'Profit' },
                        { label: 'Action' },
                    ]}
                />
                <div dir="ltr">
                    <Chart
                        options={apexBarChartOpts}
                        series={apexBarChartData}
                        type="bar"
                        className="apex-charts"
                        height={220}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default PerformanceChart;
