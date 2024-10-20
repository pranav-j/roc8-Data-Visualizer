import "./../styles/horizontalBarChart.css";
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { setSelectedYValue } from '../redux/slices/dataSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = () => {
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(null);

    // Calculate the average values for each key (A to F)
    const data = useSelector((state) => state.dataReducer.data);
    const averages = useMemo(() => {
        const totalCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
        const itemCount = data.length;

        data.forEach((item) => {
            totalCounts.A += item.A;
            totalCounts.B += item.B;
            totalCounts.C += item.C;
            totalCounts.D += item.D;
            totalCounts.E += item.E;
            totalCounts.F += item.F;
        });

        return {
            A: totalCounts.A / itemCount,
            B: totalCounts.B / itemCount,
            C: totalCounts.C / itemCount,
            D: totalCounts.D / itemCount,
            E: totalCounts.E / itemCount,
            F: totalCounts.F / itemCount,
        };
    }, [data]);

    const chartData = {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        datasets: [
            {
                label: 'Average Value',
                data: [
                    averages.A,
                    averages.B,
                    averages.C,
                    averages.D,
                    averages.E,
                    averages.F,
                ],
                backgroundColor: [
                    selectedIndex === 0 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)',
                    selectedIndex === 1 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)',
                    selectedIndex === 2 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)',
                    selectedIndex === 3 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)',
                    selectedIndex === 4 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)',
                    selectedIndex === 5 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    selectedIndex === 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                    selectedIndex === 1 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                    selectedIndex === 2 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                    selectedIndex === 3 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                    selectedIndex === 4 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                    selectedIndex === 5 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `Average: ${tooltipItem.raw}`,
                },
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const clickedIndex = elements[0].index;
                const yValue = chartData.labels[clickedIndex];
                dispatch(setSelectedYValue(yValue));
                setSelectedIndex(clickedIndex);
            }
        },
    };

    return (
        <div className="bar-chart">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default HorizontalBarChart;
