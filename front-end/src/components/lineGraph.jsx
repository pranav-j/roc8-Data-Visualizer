import "./../styles/lineGraph.css"
import React, { useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, zoomPlugin);

function LineGraph() {
    const chartRef = useRef(null);
    const data = useSelector((state) => state.dataReducer.data);
    const selectedYValue = useSelector((state) => state.dataReducer.selectedYValue);

    // Filter and prepare the data for the line chart
    const lineChartData = useMemo(() => {
        const labels = data.map((item) => item.Day);
        const values = data.map((item) => item[selectedYValue]);

        return {
            labels: labels,
            datasets: [
                {
                    label: `Values of ${selectedYValue}`,
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    fill: true,
                },
            ],
        };
    }, [data, selectedYValue]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: `Line Chart for ${selectedYValue}`,
            },
            tooltip: {
                enabled: true,
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    enabled: true,
                    mode: 'x',
                    wheel: {
                        enabled: true,
                        speed: 0.1,
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
                type: 'category',
            },
            y: {
                title: {
                    display: true,
                    text: 'Value',
                },
                beginAtZero: true,
            },
        },
    };

    const handleResetZoom = () => {
        if (chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    return (
        <div className="line-graph">
            {selectedYValue ? (
                <div className="line-graph">
                    <Line ref={chartRef} data={lineChartData} options={options} />
                    <button onClick={handleResetZoom} className="reset-zoom-button">Reset Zoom</button>
                </div>
            ) : (
                <p>Please select a Y-Value to view the chart.</p>
            )}
        </div>
    );
}

export default LineGraph;
