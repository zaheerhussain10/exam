import React, { useState } from 'react';
import { fetchMediaData } from '../services/mediaService';
import TrendsChart from './TrendsChart';

function Dashboard() {
    const [media, setMedia] = useState(null);
    const [error, setError] = useState(null);
    const [searchTitle, setSearchTitle] = useState('');
    const [trendData, setTrendData] = useState([]);

    const handleSearch = async () => {
        try {
            setError(null);
            const data = await fetchMediaData(searchTitle);
            setMedia(data);
            setTrendData((prev) => [...prev, { title: data.Title, rating: parseFloat(data.imdbRating) }]);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Media Trends Tracker</h1>
            <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Enter movie or series title"
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p>Error: {error}</p>}
            {media ? (
                <div>
                    <h2>{media.Title}</h2>
                    <p>Year: {media.Year}</p>
                    <p>Rating: {media.imdbRating}</p>
                    <p>Plot: {media.Plot}</p>
                </div>
            ) : (
                <p>Enter a title to search.</p>
            )}

            {/* Display TrendsChart */}
            {trendData.length > 0 && <TrendsChart data={trendData} />}
        </div>
    );
}

export default Dashboard;
