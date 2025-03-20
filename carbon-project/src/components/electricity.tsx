import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const API_URL = "https://api.electricitymap.org/v3/carbon-intensity/latest?zone=US-CAR-SCEG";
const API_KEY = "EZZAQG5JMZ0XzN7O24xg"; 
 
const CarbonIntensityChart = () => {
  const [data, setData] = useState<{ time: string; intensity: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "auth-token": API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${await response.text()}`);
        }

        const result = await response.json();
        console.log(result); // Debugging: Check API response

        // Process API response into chart-friendly data
        const formattedData = [
          {
            time: new Date().toLocaleTimeString(),
            intensity: result.carbonIntensity, // Adjust this based on the API response structure
          },
        ];

        setData((prevData) => [...prevData, ...formattedData]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();

    // Fetch new data every minute (optional)
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-container">
      <h2>Live Carbon Intensity Data from South Carolina Electric and Gas Company</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis label={{ value: "gCO2/kWh", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="intensity" stroke="#ff5733" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarbonIntensityChart;
