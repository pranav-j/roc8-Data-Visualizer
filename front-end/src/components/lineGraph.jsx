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

// Registering chart.js components and plugins
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, zoomPlugin);

function LineGraph() {
    const chartRef = useRef(null); // Reference to the chart instance
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
                    mode: 'x', // Allow panning on the x-axis only
                },
                zoom: {
                    enabled: true,
                    mode: 'x', // Allow zooming on the x-axis only
                    wheel: {
                        enabled: true, // Enable zooming with the scroll wheel
                        speed: 0.1, // Set the zoom speed for the scroll wheel
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

    // Function to reset the zoom
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
