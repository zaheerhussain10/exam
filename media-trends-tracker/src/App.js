import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

async function fetchMediaData(title) {
  const API_KEY = '53e71988';  // Replace with actual API key
  const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch media data');
  }
  return response.json();
}

function App() {
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [trendData, setTrendData] = useState([]);
  const [streamingPerformance, setStreamingPerformance] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMediaData(searchTitle);
      setMedia(data);
      if (data && data.imdbRating) {
        const currentYear = new Date().getFullYear();
        setTrendData((prev) => [
          ...prev,
          { title: data.Title, views: Math.floor(Math.random() * 10000), genre: data.Genre, year: currentYear },
        ]);

        const quality = ["720p", "1080p", "1440p", "4K"];
        const randomQuality = quality[Math.floor(Math.random() * quality.length)];
        const qualityScore = randomQuality === "4K" ? 10 : randomQuality === "1440p" ? 8 : randomQuality === "1080p" ? 6 : 4;

        setStreamingPerformance((prev) => [
          ...prev,
          { 
            title: data.Title,
            viewers: Math.floor(Math.random() * 5000),
            resolution: randomQuality,
            quality: qualityScore,
            duration: Math.floor(Math.random() * 120) + ' mins',
            buffering: Math.random() * 10,
            year: currentYear,
          },
        ]);
      }
      if (!searchHistory.includes(searchTitle)) {
        setSearchHistory((prev) => [...prev, searchTitle]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearTrendData = () => {
    setTrendData([]);
    setStreamingPerformance([]);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleHistoryClick = (title) => {
    setSearchTitle(title);
    handleSearch();
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2, // Improved resolution
    outerWidth : 100, 
   
  };

  const streamingQualityChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2, // Improved resolution
  };

  const bufferingChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2, // Improved resolution
  };

  const trendChartData = {
    labels: trendData.map((item) => `${item.title} (${item.year})`),
    datasets: [
      {
        label: 'Media Consumption Trend (Views)',
        data: trendData.map((item) => item.views),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.2,
        fill: false,
      },
    ],
  };

  const streamingQualityChartData = {
    labels: streamingPerformance.map((item) => `${item.title} (${item.year})`),
    datasets: [
      {
        label: 'Stream Quality (Resolution)',
        data: streamingPerformance.map((item) => item.quality),
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  };

  const bufferingChartData = {
    labels: streamingPerformance.map((item) => `${item.title} (${item.year})`),
    datasets: [
      {
        label: 'Buffering Percentage',
        data: streamingPerformance.map((item) => item.buffering),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="container">
      <h1>Media Trends Tracker</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          placeholder="Search for media..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <ClipLoader color="#5c6bc0" size={50} />}
      {error && <p className="error">Error: {error}</p>}

      {media && (
        <div className="media-details">
          <h2>{media.Title}</h2>
          <p>{media.Plot}</p>
          <p><strong>IMDB Rating: {media.imdbRating}</strong></p>
          <p><strong>Genre: {media.Genre}</strong></p>
        </div>
      )}

      <div className="charts-container">
        {trendData.length > 0 && (
          <div className="chart-container">
            <h3>Media Consumption Trend</h3>
            <Line data={trendChartData} options={trendChartOptions} />
          </div>
        )}

        {streamingPerformance.length > 0 && (
          <>
            <div className="chart-container">
              <h3>Streaming Quality (Resolution)</h3>
              <Bar data={streamingQualityChartData} options={streamingQualityChartOptions} />
            </div>

            <div className="chart-container">
              <h3>Buffering Percentage</h3>
              <Line data={bufferingChartData} options={bufferingChartOptions} />
            </div>
          </>
        )}
      </div>

      <div className="search-history">
        <h3>Search History</h3>
        <ul>
          {searchHistory.map((item, index) => (
            <li key={index} onClick={() => handleHistoryClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {trendData.length > 0 || streamingPerformance.length > 0 ? (
        <button onClick={handleClearTrendData} className="clear-button">
          Clear Trend Data
        </button>
      ) : null}

      {searchHistory.length > 0 ? (
        <button onClick={handleClearHistory} className="clear-history-button">
          Clear History
        </button>
      ) : null}
    </div>
  );
}

export default App;
