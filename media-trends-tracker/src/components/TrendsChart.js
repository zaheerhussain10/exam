import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TrendsChart({ data }) {
    const chartData = {
        labels: data.map((item) => item.title), // movie/series titles
        datasets: [
            {
                label: 'IMDB Rating',
                data: data.map((item) => item.rating),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h2>Rating Trends</h2>
            <Line data={chartData} />
        </div>
    );
}

export default TrendsChart;
